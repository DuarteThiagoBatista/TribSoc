<template>
  <v-app>
    <v-main>
      <MenuComponent v-if="!($route.path === ('/register' || '/login'))"/>
      <LogoComponent v-if="!($route.path === ('/register' || '/login'))"/>
      <router-view/>
    </v-main>
    <FooterComponent v-if="!($route.path === ('/register' || '/login'))"/>
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
