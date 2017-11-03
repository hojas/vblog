const browserEnv = require('browser-env')
const hooks = require('require-extension-hooks')
const Vue = require('vue')

// Setup browser environment
browserEnv()

// Setup Vue.js to remove production tip
Vue.config.productionTip = false

hooks('vue').plugin('vue').push()
hooks(['vue', 'js']).plugin('babel').push()

