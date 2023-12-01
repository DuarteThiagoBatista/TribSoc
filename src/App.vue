<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import MenuComponent from './components/MenuComponent.vue'
import LogoComponent from './components/LogoComponent.vue'
import FooterComponent from './components/FooterComponent.vue'


export default {
  name: 'App',

  data: () => ({
    router: true,
  }),
  components: {
    MenuComponent,
    LogoComponent,
    FooterComponent,
  },
}
</script>
