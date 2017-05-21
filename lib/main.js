const cp = require('child_process')
const rpc = require('vscode-jsonrpc')
const { AutoLanguageClient } = require('atom-languageclient')
const Logger = require('./logger')

class EmberLanguageServer extends AutoLanguageClient {

  constructor() {
    super()
    this.config = require('./config.json')

    this.clientLogger = new Logger('client')
    this.serverLogger = new Logger('server')
  }

  getGrammarScopes () { return [
    'source.js', 'text.html.htmlbars', 'text.html.mustache'
  ] }

  getLanguageName () {
    return 'Ember JS'
  }
  
  languageIdTransform(name) {
    
    switch (name.toLowerCase()) {
      case 'ember htmlbars':
      case 'html (mustache)':
        return 'handlebars'
    }
    
    return name
  }

  getServerName () {
    return 'Ember Language Server'
  }

  startServerProcess () {
    const startServer = require.resolve('@emberwatch/ember-language-server')
    const process = cp.spawn('node', [startServer, '--node-ipc'], {
      stdio: [null, null, null, 'ipc']
    })

    process.stderr.on('data', data => this.serverLogger.error(typeof data === 'string' ? data : data.toString('utf8')))
    process.stdout.on('data', data => this.serverLogger.debug(typeof data === 'string' ? data : data.toString('utf8')))

    return process
  }

  getLogger() {
    return this.clientLogger
  }

  createRpcConnection(process) {
    const reader = new rpc.IPCMessageReader(process)
    const writer = new rpc.IPCMessageWriter(process)

    return rpc.createMessageConnection(reader, writer, this.getLogger())
  }

  getInitializeParams(projectPath, process) {
    return {
      processId: process.pid,
      capabilities: {},
      rootUri: `file://${projectPath}`
    }
  }
}

module.exports = new EmberLanguageServer()
