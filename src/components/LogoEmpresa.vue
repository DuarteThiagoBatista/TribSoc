<template>
  <v-img class="img" :src="logo"></v-img>
</template>

<script>
import logo from "/public/loginho.png";
export default {
  data: () => ({
    logo,
  }),
};
</script>