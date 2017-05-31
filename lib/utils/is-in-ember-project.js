const path = require('path')
const fs = require('fs')

module.exports = function isInEmberProject (editor) {
  const filePath = editor && editor.getPath()

  if (filePath) {
    const parts = filePath.split(path.sep)
    do {
      let dirPath = parts.join(path.sep) || '/'
      const fileBuildPath = path.join(dirPath, 'ember-cli-build.js')

      try {
        fs.accessSync(fileBuildPath, fs.R_OK)
        return true
      } catch (_) {
        // Do nothing
      }
    } while (parts.pop())
  }

  return false
}
