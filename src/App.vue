<template>
  <v-app>
    <v-main>
      <MenuComponent />
      <LogoComponent />
      <router-view/>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import MenuComponent from './components/MenuComponent.vue'
import LogoComponent from './components/LogoComponent.vue'
import FooterComponent from './components/FooterComponent.vue'


export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    MenuComponent,
    LogoComponent,
    FooterComponent,
    MenuComponent,
    FooterComponent
}
}
</script>
