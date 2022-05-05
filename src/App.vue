<template>
  <header>
    <LogoEmpresa />
  </header>
  <v-lazy>
    <v-row justify="center">
      <div class="caixa"><ConversorCaixa /></div>
    </v-row>
  </v-lazy>
  <Footer />
</template>

<script>
import LogoEmpresa from "./components/LogoEmpresa.vue";
import ConversorCaixa from "./components/ConversorCaixa.vue";
import Footer from "./components/FooterComponent.vue";

export default {
  name: "App",

  components: {
    ConversorCaixa,
    LogoEmpresa,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
