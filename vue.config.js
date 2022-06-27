const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/includes/variables.scss";
          @import "@/assets/styles/includes/animations.scss";
        `
      }
    }
  }
})
