const cp = require('child_process')
const { AutoLanguageClient } = require('atom-languageclient')
const Logger = require('./logger')

class EmberLanguageServer extends AutoLanguageClient {
  constructor () {
    super()
    this.config = require('./config.json')

    this.clientLogger = new Logger('client')
    this.serverLogger = new Logger('server')
  }

  getGrammarScopes () {
    return ['source.js', 'text.html.htmlbars', 'text.html.mustache']
  }

  getLanguageName () {
    return 'Ember JS'
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

  getConnectionType () {
    return 'ipc'
  }

  getLogger () {
    return this.clientLogger
  }
}

module.exports = new EmberLanguageServer()
