const path = require('path')

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  root: rootPath,
  admin: path.resolve(rootPath, 'admin'),
  public: path.resolve(rootPath, 'public')
}
