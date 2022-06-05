<template>
    <div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center">
        <RegisterComponent />
    </div>
</template>

<script>
import RegisterComponent from "../components/forms/RegisterComponent.vue";

export default {
  components: {
    RegisterComponent,
  },
}
</script>