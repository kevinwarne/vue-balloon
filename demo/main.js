// This file will build the demo

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Demo from './Demo'
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Demo/>',
  components: { Demo }
})
