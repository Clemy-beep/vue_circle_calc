<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>
      <span class="material-icons"> calculate </span> Calculateur de dimensions
      d'un cercle
    </h1>
    <p>
      Cette application sert à calculer le périmètre et l'aire d'un cercle à
      partir de votre saisie. Elle permet également de connaître le volume de la
      sphère correspondante.
    </p>
    <FormComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormComponent from "@/components/Form.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    FormComponent,
  },
});
</script>

<style scoped>
p {
  margin: 0 20%;
  text-align: center;
}
</style>
