<template>
<v-card class="caixa" style="padding: 15px; border-radius: 15px;">
    <v-lazy>
      <div style="display: flex; justify-content: center; flex-direction: column;">
    <InvalidValue v-model="alerts" v-show="valor && !(valor > 0) && alerts"/>
    <NoValue v-model="alerts" v-show="!valor && alerts"/>
    <NoCurrency v-model="alerts" v-show="!select && alerts"/>
    </div>
    </v-lazy>
    <v-card-header-text>
    <p class="titulo grande">Conversor Salarial</p>
    </v-card-header-text>
    <v-select
      prepend-icon="mdi-currency-usd"
      v-model="select"
      :items="items"
      variant="outlined"
      :rules="[(v) => !!v || 'Escolha uma moeda']"
      label="Moeda"
      color="#1C3762"
      style="color: #1C3762"
    ></v-select>
    <v-text-field
      prepend-icon="mdi-cash"
      hide-details=""
      v-model="valor"
      type="number"
      label="Valor"
      :rules="valorRules"
      placeholder="Valor"
      variant="outlined"
      color="#1C3762"
      @click="
        resultado = false;
        valor = '';
        getBackData;
        alerts = true;
        salarioBruto = 0;
      "
      style="color: #1C3762"

    ></v-text-field>

    <v-card-text style="display: flex; justify-content: center;">
      <div v-if="resultado && (this.salarioBruto != 0)" class="resultado" style="width: fit-content">
        <p class="titulo">Resultado da Conversão</p>
        <p class="valor">R${{ salarioBruto }}</p>
      </div>

      <v-progress-circular v-if="resultado && (this.salarioBruto == 0)"
      color="#3FACDA"
      indeterminate>
      </v-progress-circular>
    </v-card-text>
    
    <v-card-actions style="display: flex; justify-content: center">
      <v-btn
      v-if="!(!select || !valor || !(valor > 0))"
      style="color: white; background-color: #3FACDA;"
      class="button"
      @click="showsalario"
    >
      Calcular
    </v-btn>

    <v-btn v-else
    :disabled="!select || !valor || !(valor > 0)"
    style="color: white; opacity: 0.6; background-color: #3FACDA;"
    >
      Calcular
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { createApp } from '@vue/runtime-dom';
import App from '@/App.vue';
import NoValue from './alerts/NoValueComponent.vue';
import NoCurrency from './alerts/NoCurrencyComponent.vue';
import InvalidValue from './alerts/InvalidValueComponent.vue'

const app = createApp(App)
app.use();

export default {
  data: () => ({
    alerts: false,
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
      (v) => v > 0 || "Valor inválido!",
    ],
  }),
  components: {
    NoValue,
    NoCurrency,
    InvalidValue,
},

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
      this.salarioBruto = await this.getBackData();
      return this.salarioBruto;
    }
  },
};
</script>