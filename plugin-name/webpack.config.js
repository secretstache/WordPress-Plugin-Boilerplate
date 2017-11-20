const path = require('path')

const publicEntry = 'public/js/plugin-name-public'
const adminEntry = 'admin/js/plugin-name-admin'

module.exports = {
  entry: {
    [publicEntry]: `./${publicEntry}.js`,
    [adminEntry]: `./${adminEntry}.js`
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname)
  }
}
