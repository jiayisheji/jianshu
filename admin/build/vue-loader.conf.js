var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: function(webpack){
      return [
          require('postcss-import')({ addDependencyTo: webpack }),
          require('precss'),
          require('postcss-cssnext')({"autoprefixer": {"browsers": "ie >= 10, ..."}})
      ]
  }
}
