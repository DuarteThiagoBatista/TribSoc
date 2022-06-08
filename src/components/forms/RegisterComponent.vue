<template>
    <v-form
    ref="form"
    v-model="as"
    >
    <v-card style="border-radius: 10px; width: 400px">
        <v-card-header style="display: flex; flex-direction:column; justify-content: space-around;">
            <v-btn variant="plain" to="/" style="height: 80px; width: 80px;" flat>
                <v-img :src="Logo">
                </v-img>
            </v-btn>
            <v-card-header-text class="titulo grande" style="margin-bottom: 20px;">
                <v-card-title>Cadastro de Empresa</v-card-title>
            </v-card-header-text>
            </v-card-header>
            <v-card-text style="display: flex; flex-direction:column; justify-content: space-around; align-items: center;">
            <v-text-field
            v-model="company"
            placeholder="Nome da Empresa"
            style="width: 250px;"
            bg-color="#f5f5f5"
            density="compact"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => !!v || 'Insira o nome da empresa']"
            required
            >
            </v-text-field>
            <v-text-field
            v-model="country"
            placeholder="País"
            style="width: 250px;"
            bg-color="#f5f5f5"
            :items="items"
            density="compact"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => !!v || 'Selecione país de origem']"
            >
            </v-text-field>
            <v-text-field
            v-model="email"
            style="width: 250px;"
            bg-color="#f5f5f5"
            density="compact"
            placeholder="Email"
            variant="outlined"
            color="#1C3762"
            :rules="emailRules"
            required
            >
            </v-text-field>
            <v-text-field
            v-model="password"
            v-click-outside="alternate"
            :type="show ? 'text' : 'password'"
            bg-color="#f5f5f5"
            style="width: 250px;"
            density="compact"
            placeholder="Senha"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => !!v || 'Insira seu nome']"
            required
            @click="clicked = true"
            >
            </v-text-field>
            <v-icon
            style="margin-top: -68px; margin-bottom: 50px; margin-left: 200px;"
            :color="clicked ? '#4e6180' : '#b0b0b0'"
            :icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click="show = !show">
            </v-icon>
            <v-text-field
            v-click-outside="alternate2"
            v-model="confirmedpassword"
            :type="show2 ? 'text' : 'password'"
            style="width: 250px;"
            bg-color="#f5f5f5"
            density="compact"
            placeholder="Confirmar senha"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => (!!v && v === password) || 'Senhas não coincidem']"
            required
            @click="clicked2 = true"
            >
            </v-text-field>
            <v-icon
            style="margin-top: -68px; margin-bottom: 50px; margin-left: 200px;"
            :color="clicked2 ? '#4e6180' : '#b0b0b0'"
            :icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click="show2 = !show2">
            </v-icon>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: center; margin-top: -20px;">
            <v-btn 
      style="color: white; background-color: #3FACDA; margin-bottom: 20px;"
      to="/s"
      :disabled="confirmedpassword || password || email || country || company"
    >
      Cadastrar
    </v-btn>
        </v-card-actions>
    </v-card>
    </v-form>
</template>

<script>
import Logo from "/public/logo.png";

export default {
    data: () => ({
        clicked: false,
        clicked2: false,
        show: false,
        show2: false,
        Logo,
        emailRules: [
        v => !!v || 'É necessário um endereço de email',
        v => /.+@.+\..+/.test(v) || 'Endereço de email inválido'
        ],
        items: ["Estados Unidos"],
    }),

    methods: {
        alternate(){
            this.clicked = false
        },

        alternate2(){
            this.clicked2 = false
        }
    }
}
</script>