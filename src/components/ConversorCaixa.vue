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
        sendData;
      "
      required
    ></v-text-field>
    <v-lazy
      ><div class="resultado" v-show="resultado">
        <p class="titulo">Resultado da Conversão</p>
        <p class="valor">R${{ salarioBruto }}</p>
      </div></v-lazy
    >
    <v-btn
      style="color: #1c3762"
      class="button"
      :color="tribsocAzul"
      @click="showsalario"
      :disabled="!select"
    >
      Calcular
    </v-btn>
  </v-form>
</template>

<script>
import { createApp } from '@vue/runtime-dom';
import axios from 'axios';
import App from '@/App.vue';
import VueAxios from 'vue-axios';

const app = createApp(App)
app.use(VueAxios, axios);

export default {
  data: () => ({
    salarioBruto: 0,
    resultado: false,
    select: null,
    valor: "",
    valorConvertido: "",
    moeda: "",
    tribsocAzul: "#3FACDA",
    items: ["Dólar"],
    valorRules: [
      (v) => !!v || "É necessário escolher um valor.",
      (v) => (v && v > 0) || "Valor inválido!",
    ],
  }),
  onUpdated() {
    console.log(this.salarioBruto);
  },
  methods: {
     async getBackData() {
      try {
      const response = await fetch(`https://trib-soc-back.herokuapp.com/converter/${this.valor}`);
      const data = await response.json();
      return data.salario_liquido;
    } catch (error) {
      console.log(error)
    }
    },
    async showsalario() {
      this.resultado = true;
      return this.salarioBruto = await this.getBackData();
    }
  },
  async sendData() {
    const response = await this.axios.get(`https://trib-soc-back.herokuapp.com/converter/${this.valor}`);
    console.log(response.data["valor_inserido"]);
    return response.data["valor_inserido"];
  }
};
</script>