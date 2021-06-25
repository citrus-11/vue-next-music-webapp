const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        /* 全局引入 mixin 和 variable 
        -----------*/
        prependData: `
          @import '@/assets/scss/mixin.scss';
          @import '@/assets/scss/variable.scss';
        `,
      },
    },
  },
  devServer: {
    before(app) {
      registerRouter(app)
    },
  },
  // 分析依赖 npm run build/serve --report
  configureWebpack: config => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin =
        require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  productionSourceMap: false, // 生产不需要打开sourceMap
}
