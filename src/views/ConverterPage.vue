<template>
  <v-lazy>
      <div class="" style="margin-bottom: 100px; width: 100%; display: flex; justify-content: center">
        <ConversorCaixa />
      </div>
  </v-lazy>
</template>

<script>
import LogoEmpresa from "../components/LogoComponent.vue";
import ConversorCaixa from "../components/ConverterComponent.vue";

export default {
  components: {
    ConversorCaixa,
  },

  data: () => ({}),
  methods: {},
  onBeforeMounted() {
    this.getBackData();
  },
  onMounted() {
    console.log(this.getBackData());
  },
};
</script>