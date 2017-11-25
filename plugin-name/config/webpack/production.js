const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const shared = require('./shared')

module.exports = merge(shared, {
  plugins: [new UglifyJSPlugin()]
})
