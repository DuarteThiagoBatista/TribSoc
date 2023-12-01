<template>
      <div style="width: 100%; display: flex; justify-content: center">
        <LogoComponent />
        <ConversorCaixa />
      </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import ConversorCaixa from "../components/ConverterComponent.vue";

export default {
  components: {
    ConversorCaixa,
    LogoComponent
},

  data: () => ({}),
  methods: {},
};
</script>