const { atom } = global

module.exports = class Logger {
  constructor (type) {
    this.prefix = `[ide-ember:${(type || '').toUpperCase()}]`

    const configKey = `ide-ember.${type}Logging`

    this.active = Boolean(atom.config.get(configKey))
    atom.config.observe(configKey, (value) => (this.active = value))
  }

  error () { this._out('error', ...arguments) }

  warn () { this._out('warn', ...arguments) }

  info () { this._out('info', ...arguments) }

  log () { this._out('log', ...arguments) }

  debug () { this._out('debug', ...arguments) }

  _out (type, ...args) {
    if (this.active) {
      console[type](this.prefix, ...args)
    }
  }
}
