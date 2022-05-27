const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/webpack-plugin-vuetify/tree/next/packages/webpack-plugin-vuetify
		}
  }
})
