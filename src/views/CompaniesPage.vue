<template>
<v-container>
  <v-row justify="center">
    <v-col>
      <Company />
    </v-col>
    <v-spacer> </v-spacer>
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
    <v-spacer></v-spacer>
    <v-col>
      <Company />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import Company from "../components/CompanyComponent.vue"

export default {
    name: "CompaniesPage",
    
    components: {
      Company,
    }
}
</script>
