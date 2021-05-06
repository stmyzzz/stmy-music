module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets': '@/assets',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
        'router':'@/router',
        'style':'@/style',
        'layout':'@/layout',
        'utils':'@/utils',
        "base":'@/base'
      }
    }
  },
  css: {
  loaderOptions: {
  sass: {
    prependData: `
      @import "@/style/mixin.scss";
      @import "@/style/common.scss";
      @import "@/style/element-css.scss";
    `
  },
  }
}

}