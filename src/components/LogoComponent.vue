<template>
<div style="display: flex; justify-content: center">
  <v-btn variant="plain" to="/" style="height: 120px; width: 120px; background-color: whitesmoke;" elevation="0">
      <v-img class="img" :src="Logo">
    </v-img></v-btn>
</div>
</template>

<script>
import Logo from "/public/logo.png";
import Router from "../router/index.js";
export default {
  data: () => ({
    Logo,
    Router,
  }),
};
</script>