<template>
    <v-app-bar style="display: flex">
        <v-btn to="/">
            <v-img
            :src="Logo">
            </v-img>
        </v-btn>
        <v-divider vertical></v-divider>
          <v-btn to="/converter" prepend-icon="mdi-cash" color="#1C3762"> Conversor </v-btn>
          <v-divider vertical></v-divider>
          <v-btn to="/companies" append-icon="mdi-briefcase" color="#1C3762"> Vagas </v-btn>

        <div style="width: 100%; display: flex; justify-content: flex-end;">
          <v-btn color="#1C3762">
                Entrar
          </v-btn>
          <v-btn to="/register" style="background-color: #3FACDA;" color="white">
                Inscrever-se
          </v-btn>
        </div>
      </v-app-bar>
</template>

<script>
import Logo from "/public/logo.png";
export default {
    name: "menuComponent",

    data: () =>({
        Logo,
    })
}
</script>

<style>

</style>