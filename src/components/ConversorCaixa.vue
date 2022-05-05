<template>
  <v-form ref="form" class="input">
    <p class="titulo grande">Conversor Salarial</p>
    <v-select
      prepend-icon="mdi-currency-usd"
      v-model="select"
      :items="items"
      :rules="[(v) => !!v || 'Escolha uma moeda']"
      label="Moeda"
      :color="tribsocAzul"
      required
    ></v-select>
    <v-text-field
      prepend-icon="mdi-cash"
      v-model="valor"
      type="number"
      label="Valor"
      :rules="valorRules"
      placeholder="Valor"
      variant="outlined"
      :color="tribsocAzul"
      @click="
        resultado = false;
        valor = '';
      "
      required
    ></v-text-field>
    <v-lazy
      ><div class="resultado" v-show="resultado">
        <p class="titulo">Resultado da Conversão</p>
        <p class="valor">R${{ valorConvertido }}</p>
      </div></v-lazy
    >
    <v-btn
      style="color: #1c3762"
      class="button"
      :color="tribsocAzul"
      @click="calcular"
      :disabled="!select"
    >
      Calcular
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valor: "",
    valorConvertido: "",
    valorRules: [
      (v) => !!v || "É necessário escolher um valor.",
      (v) => (v && v > 0) || "Valor inválido!",
      //(v) => /.+,.+.+/.test(v) || "Valor inválido.",
    ],
    resultado: false,
    select: null,
    items: ["Dólar", "Euro", "Libra"],
    tribsocAzul: "#3FACDA",
    moeda: "",
  }),

  methods: {
    calcular() {
      console.log("Fez o cálculo");
      this.resultado = true;
      switch (this.select) {
        case "Dólar":
          this.moeda = 4.96;
          break;
        case "Euro":
          this.moeda = 5.24;
          break;
        case "Libra":
          this.moeda = 6.25;
          break;
      }
      this.valorConvertido = (this.valor * this.moeda).toFixed(2);
    },
  },
};
</script>