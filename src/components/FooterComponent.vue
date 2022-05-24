<template>
    <v-footer
    style="max-height: 50px; width: 100%; display: flex; justify-content: center; background-color: white;"
      elevation="5">
        <v-btn  
          icon="mdi-home"
          variant="plain"
          to="/"
        ></v-btn>
        <v-divider vertical></v-divider>
        <v-btn
          icon="mdi-github"
          variant="plain"
        ></v-btn>
      <div>
        {{ new Date().getFullYear() }} — <strong>TribSOC</strong>
        </div>
    </v-footer>
</template>