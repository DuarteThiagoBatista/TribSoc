<template>
  <v-app>
    <v-main>
      <header>
        <LogoComponent />
      </header>
      <MenuComponent />
      <router-view/>
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import MenuComponent from "./components/MenuComponent.vue"
import FooterComponent from "./components/FooterComponent.vue"
import LogoComponent from "./components/LogoComponent.vue"

export default {
  name: 'App',

  components: {
    MenuComponent,
    FooterComponent,
    LogoComponent,
  },

  data: () => ({
    home: false,
  }),
}
</script>
