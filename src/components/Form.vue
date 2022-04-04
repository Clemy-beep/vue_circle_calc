<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <label for="radius">Saisissez un nombre</label>
      <input type="number" name="radius" id="radius" v-model="radius" min="1" />
      <input type="submit" value="Calculer" />
    </form>
    <span v-if="error !== ''"> {{ error }}</span>
    <table id="response" v-if="area > 0">
      <caption>
        Résultats :
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
import { mapState, mapWritableState } from "pinia";
import { defineComponent } from "vue";
import { useRadiusStore } from "../stores/radiusStore";

export default defineComponent({
  name: "FormComponent",
  data() {
    return {
      radius: Number,
      error: "",
      area: Number,
      perimeter: Number,
      volume: Number,
    };
  },
  computed: {
    ...mapWritableState(useRadiusStore, {
      setRadius: "radius",
    }),
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
    checkRadius: function () {
      if (this.getRadius !== null) {
        this.area = this.calcArea(this.currentRadius);
        this.perimeter = this.calcPerimeter(this.currentRadius);
        this.volume = this.calcVolume(this.currentRadius);
      }
    },

    handleSubmit: function () {
      console.log(typeof this.radius);
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
      this.area = this.calcArea(this.radius);
      this.perimeter = this.calcPerimeter(this.radius);
      this.volume = this.calcVolume(this.radius);
    },

    calcArea: function (radius) {
      let num = Math.PI * radius * radius;
      return num.toFixed(2);
    },

    calcPerimeter: function (radius) {
      let num = 2 * Math.PI * radius;
      return num.toFixed(2);
    },

    calcVolume: function (radius) {
      let num = (4 / 3) * Math.PI * Math.pow(radius, 3);
      return num.toFixed(2);
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
