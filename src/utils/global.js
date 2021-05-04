import Meta from 'vue-meta'

export default {
  install(Vue) {

    /* 自动化导入 */
    const requireComponent = require.context(
      "@/base",
      true,
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )
    //批量注册base组件
    console.log('requireComponent',requireComponent)
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if(componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })
    
    Vue.use(Meta)

  }
}