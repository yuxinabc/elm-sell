import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './common/stylus/index.styl'
import './register'
import store from './store'
import moment from 'moment'
Vue.config.productionTip = false
Vue.filter('getTimeFormat', (time, formatString) => {
 return moment(time).format(formatString)
})
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
