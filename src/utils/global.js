import Meta from 'vue-meta'
import VueLazyload from 'vue-lazyload'
import * as utils from './index'
export default {
  install(Vue) {

    /* 自动化导入 */
    const requireComponent = require.context(
      "@/base",
      true,
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )
    //批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if(componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })
    Vue.prototype.$utils = utils
    Vue.use(Meta).use(VueLazyload)

  }
}