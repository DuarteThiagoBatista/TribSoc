<template>
    <v-app-bar style="display: flex">
        <v-btn @click="home = true;" to="/"
        variant="plain">
            <v-img
            :src="logo">
            </v-img>
        </v-btn>
        <v-divider vertical></v-divider>
          <v-btn @click="home = false;" variant="plain" to="/converter" prepend-icon="mdi-cash" color="#1C3762"> Conversor </v-btn>
          <v-divider vertical></v-divider>
          <v-btn @click="home = false;" variant="plain" to="/companies" append-icon="mdi-briefcase" color="#1C3762"> Vagas </v-btn>

        <div style="width: 100%; display: flex; justify-content: flex-end;">
          <v-btn color="#1C3762">
                Entrar
          </v-btn>
          <v-btn style="background-color: #3FACDA;" color="white">
                Inscrever-se
          </v-btn>
        </div>
      </v-app-bar>
</template>

<script>
import logo from "/public/logo.png";
export default {
    name: "menuComponent",

    data: () =>({
        logo,
    })
}
</script>

<style>

</style>