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
    const childProcess = cp.spawn(process.execPath, [startServer, '--node-ipc', '--no-deprecation'], {
      stdio: [null, null, null, 'ipc'],
      env: {
        ELECTRON_RUN_AS_NODE: 1,
        ELECTRON_NO_ATTACH_CONSOLE: 1
      }
    })

    childProcess.stderr.on('data', data => this.serverLogger.error(typeof data === 'string' ? data : data.toString('utf8')))
    childProcess.stdout.on('data', data => this.serverLogger.debug(typeof data === 'string' ? data : data.toString('utf8')))

    return childProcess
  }

  getConnectionType () {
    return 'ipc'
  }

  getLogger () {
    return this.clientLogger
  }
}

module.exports = new EmberLanguageServer()
