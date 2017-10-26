const { AutoLanguageClient } = require('atom-languageclient')
const Logger = require('./logger')
const isInEmberProject = require('./utils/is-in-ember-project')

class EmberLanguageServer extends AutoLanguageClient {
  constructor () {
    super()
    this.config = require('./config.json')

    this.clientLogger = new Logger('client')
    this.serverLogger = new Logger('server')
  }

  getGrammarScopes () {
    return [
      'source.js',
      'text.html.spacebars',
      'text.html.htmlbars',
      'text.html.mustache'
    ]
  }

  getLanguageName () {
    return 'Ember JS'
  }

  getServerName () {
    return 'Ember Language Server'
  }

  startServerProcess () {
    const startServer = require.resolve('@emberwatch/ember-language-server')
    const childProcess = this.spawnChildNode(
      [ startServer, '--node-ipc' ],
      { stdio: [null, null, null, 'ipc'] }
    )

    const logHandler = (type) =>
      (data) => this.serverLogger[type](
        typeof data === 'string'
          ? data
          : data.toString('utf8')
      )

    childProcess.stderr.on('data', logHandler('error'))
    childProcess.stdout.on('data', logHandler('debug'))

    return childProcess
  }

  getConnectionType () {
    return 'ipc'
  }

  getLogger () {
    return this.clientLogger
  }

  shouldStartForEditor (editor) {
    return super.shouldStartForEditor(editor) && isInEmberProject(editor)
  }
}

module.exports = new EmberLanguageServer()
