const merge = require('webpack-merge')
const shared = require('./shared')

module.exports = merge(shared, {
  watch: true,
  watchOptions: {
    pool: 1000
  },
  devtool: 'cheap-module-source-map'
})
