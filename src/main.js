// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueMaterialCSS from '../node_modules/bootstrap/dist/css/bootstrap.css'

Vue.use(VueResource)

Vue.filter('json', function (value) {
  return JSON.stringify(value, null, 2);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
