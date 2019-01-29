import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './common/stylus/index.styl'
import './register'
import store from './store'
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
