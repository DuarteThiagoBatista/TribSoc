<template>
  <v-img v-if="home" class="img" :src="LogoCompleta">
  </v-img>
  <v-img v-else class="img" :src="Logo">
  </v-img>
</template>

<script>
import Logo from "/public/logo.png";
import LogoCompleta from "/public/logocompleta.png";
import Router from "../router/index.js";
export default {
  data: () => ({
    Logo,
    LogoCompleta,
    Router,
  }),
};
</script>