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
}
