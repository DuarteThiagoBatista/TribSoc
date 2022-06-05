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
            placeholder="Nome da Empresa"
            style="width: 250px;"
            bg-color="#f5f5f5"
            density="compact"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => !!v || 'Insira seu nome']"
            required
            >
            </v-text-field>
            <v-text-field
            style="width: 250px;"
            bg-color="#f5f5f5"
            density="compact"
            placeholder="Localização"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => !!v || 'Insira seu nome']"
            required
            >
            </v-text-field>
            <v-text-field
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
            bg-color="#f5f5f5"
            style="width: 250px;"
            density="compact"
            placeholder="Senha"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => !!v || 'Insira seu nome']"
            required
            >
            </v-text-field>
            <v-text-field
            style="width: 250px;"
            bg-color="#f5f5f5"
            density="compact"
            placeholder="Confirmar senha"
            variant="outlined"
            color="#1C3762"
            :rules="[(v) => (!!v && v === password) || 'Senhas não coincidem']"
            required
            >
            </v-text-field>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: center; margin-top: -20px;">
            <v-btn
      v-if="!as"
      style="color: white; background-color: #3FACDA; margin-bottom: 20px;"
      to="/s"
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
        Logo,
        emailRules: [
        v => !!v || 'É necessário um endereço de Email',
        v => /.+@.+\..+/.test(v) || 'Endereço de Email inválido'
        ]
    }),
}
</script>