import Vue from 'vue'
import Router from 'vue-router'
import Translator from 'components/translator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Translator',
      component: Translator
    }
  ]
})
