var merge = require('webpack-merge')
var demoEnv = require('./demo.env')

module.exports = merge(demoEnv, {
  NODE_ENV: '"development"'
})
