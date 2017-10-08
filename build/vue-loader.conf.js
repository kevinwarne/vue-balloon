var utils = require('./utils')
var config = require('../config')
var isDemo = process.env.NODE_ENV === 'demo'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isDemo
      ? config.demo.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isDemo
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
