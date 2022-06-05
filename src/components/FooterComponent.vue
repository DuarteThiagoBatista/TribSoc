<template>
    <v-footer
    style="max-height: 50px; width: 100%; display: flex; justify-content: center; background-color: white;"
      elevation="5">
        <v-btn
          append-icon="mdi-github"
          variant="plain"
          href="https://github.com/DuarteThiagoBatista/TribSoc"
          target="_blank"
        >
        <v-tooltip
        activator="parent"
        anchor="top"
      >FrontEnd</v-tooltip>
      </v-btn>
        <v-divider vertical></v-divider>
        <v-btn
          prepend-icon="mdi-github"
          variant="plain"
          href="https://github.com/DuarteThiagoBatista/TribSocBackEnd"
          target="_blank"
        >
        <v-tooltip
        activator="parent"
        anchor="top"
      >BackEnd</v-tooltip>
      </v-btn>
      <div style="color: #1C3762">
        {{ new Date().getFullYear() }} — <strong>TribSOC</strong>
        </div>
    </v-footer>
</template>