import { defineStore } from "pinia";

export const useRadiusStore = defineStore({
  id: "radius",
  state: () => ({
    radius: 0,
  }),
  getters: {
    getRadius: (state) => state.radius,
  },
  actions: {
    //calcule l'aire du cercle d'après le radius stocké dans le store
    calcArea: function () {
      const num = Math.PI * this.radius * this.radius;
      return num.toFixed(2);
    },

    //calcule le périmètre du cercle d'après le radius stocké dans le store
    calcPerimeter: function () {
      const num = 2 * Math.PI * this.radius;
      return num.toFixed(2);
    },

    //calcule le volume de la sphère d'après le radius stocké dans le store
    calcVolume: function () {
      const num = (4 / 3) * Math.PI * Math.pow(this.radius, 3);
      return num.toFixed(2);
    },
  },
});
