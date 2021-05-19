import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import global from './utils/global'
import './style/index.scss'
import Scroll from "vue-better-scroller";
import VueBetterScroll from 'vue2-better-scroll'
Vue.config.productionTip = false
Vue.use(ElementUI).use(global).use(Scroll).use(VueBetterScroll)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
