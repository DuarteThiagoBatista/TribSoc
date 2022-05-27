import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vuetify from 'vuetify/lib'

loadFonts()

createApp(App)
  .use(router)
  .use(Vuetify)
  .mount('#app')
