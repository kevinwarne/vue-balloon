// This file will build the demo

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Demo from './Demo'
import DemoSingle from './DemoSingle'
import DemoMultiple from './DemoMultiple'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { name: 'single', path: '/', alias: '/single', component: DemoSingle },
    { name: 'multiple', path: '/multiple', component: DemoMultiple }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Demo/>',
  components: { Demo },
  router
})
