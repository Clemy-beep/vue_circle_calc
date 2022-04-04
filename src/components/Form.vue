<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <label for="radius">Saisissez un nombre</label>
      <input type="number" name="radius" id="radius" v-model="radius" min="1" />
      <input type="submit" value="Calculer" />
    </form>
    <span v-if="error !== ''"> {{ error }}</span>
    <table id="response" v-if="area !== 0">
      <caption>
        Résultats (votre saisie était
        {{
          radius
        }}) :
      </caption>
      <thead>
        <tr>
          <th>Périmètre du cercle</th>
          <th>Aire du cercle</th>
          <th>Volume de la sphère</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ perimeter }} cm²</td>
          <td>{{ area }} cm²</td>
          <td>{{ volume }} cm³</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { defineComponent } from "vue";
import { useRadiusStore } from "../stores/radiusStore";

export default defineComponent({
  name: "FormComponent",
  data() {
    return {
      radius: 0,
      error: "",
      area: 0,
      perimeter: 0,
      volume: 0,
    };
  },
  computed: {
    //stocke la valeur dans le store
    ...mapWritableState(useRadiusStore, {
      setRadius: "radius",
    }),
    //récupère la valeur du store
    ...mapState(useRadiusStore, {
      getRadius: "radius",
    }),
    currentRadius() {
      return this.getRadius;
    },
  },

  mounted() {
    this.checkRadius();
  },
  methods: {
    //appelle les fonctions du store
    ...mapActions(useRadiusStore, ["calcPerimeter", "calcVolume", "calcArea"]),

    //vérifie si le store contient quelque chose (ici une valeur différente de zéro). si oui, fait directement les calculs avec la valeur stockée
    checkRadius: function () {
      if (this.currentRadius !== 0) {
        this.radius = this.currentRadius;
        this.calculateValues();
      }
    },

    //vérifie l'input de l'utilisateur. si celui-ci est conforme, stocke la valeur dans le store puis appelle la fonction responsable des calculs
    handleSubmit: function () {
      if (
        this.radius <= 0 ||
        !Number.isInteger(this.radius) ||
        this.radius === null
      ) {
        this.error =
          "Merci de saisir un entier positif non nul supérieur à zéro";
        return;
      }
      this.setRadius = this.radius;
      this.calculateValues();
    },

    //effectue les calculs d'aire de surface et de volume avec la valeur stockée dans le store
    calculateValues() {
      const store = useRadiusStore();
      this.area = store.calcArea();
      this.perimeter = store.calcPerimeter();
      this.volume = store.calcVolume();
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
caption {
  padding: 1em;
  font-weight: bold;
}
label,
input {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
form {
  position: relative;
  margin: 0 auto;
  width: fit-content;
  border: 1px solid #41b883;
  padding: 0.8em;
  border-radius: 8px;
}
label {
  display: block;
}
input {
  display: block;
  height: 40px;
  background-color: transparent;
  border: 1px solid #34495e;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 8px;
  color: rgb(195, 192, 205);
  margin-left: auto;
  margin-right: auto;
}
input[type="submit"] {
  background-color: #41b883;
  color: black;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  margin-top: 1em;
  border: none;
}
form {
  margin-top: 1em;
}

.error {
  color: #ee2020;
  padding: 1em;
  font-weight: 600;
}
table {
  margin-left: auto;
  margin-right: auto;
  border-spacing: 0.5em;
}
table,
tr {
  border: 1px solid black;
}
</style>
