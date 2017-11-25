const paths = require('../paths')

const publicEntry = 'js/index'
const adminEntry = 'js/plugin-name-admin'

module.exports = {
  entry: {
    [`public/build/js/bundle`]: `./public/${publicEntry}.js`,
    [`admin/build/js/bundle`]: `./admin/${adminEntry}.js`
  },
  output: {
    filename: '[name].js',
    path: paths.rootPath
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  }
}
