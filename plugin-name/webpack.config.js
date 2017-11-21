const path = require('path')

const publicEntry = 'js/plugin-name-public'
const adminEntry = 'js/plugin-name-admin'

module.exports = {
  entry: {
    [`public/build/${publicEntry}`]: `./public/${publicEntry}.js`,
    [`admin/build/${adminEntry}`]: `./admin/${adminEntry}.js`
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname)
  }
}
