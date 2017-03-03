import Vue from 'vue'
import Router from 'vue-router'
import Base from 'components/base'
import Translator from 'components/translator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Base',
      component: Base
    },
    {
      path: '/translator',
      name: 'Translator',
      component: Translator
    }
  ]
})
