import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'

import '@lin/mixin'
import '@lin/filter'
import '@lin/plugins'
import '@lin/directives'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import StickyTop from '@c/base/sticky-top/sticky-top'
import LIcon from '@c/base/icon/lin-icon'
import SourceCode from '@c/base/source-code/source-code'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

import '@/assets/styles/index.scss' // eslint-disable-line
import '@/assets/styles/realize/element-variables.scss'
import 'element-ui/lib/theme-chalk/display.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.component(CollapseTransition.name, CollapseTransition)

// base 组件注册
Vue.component('sticky-top', StickyTop)
Vue.component('l-icon', LIcon)
Vue.component('source-code', SourceCode)

/* eslint no-unused-vars: 0 */
const AppInstance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance
