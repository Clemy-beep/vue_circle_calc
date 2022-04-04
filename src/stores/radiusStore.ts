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
    calcArea: function () {
      const num = Math.PI * this.radius * this.radius;
      return num.toFixed(2);
    },

    calcPerimeter: function () {
      const num = 2 * Math.PI * this.radius;
      return num.toFixed(2);
    },

    calcVolume: function () {
      const num = (4 / 3) * Math.PI * Math.pow(this.radius, 3);
      return num.toFixed(2);
    },
  },
});
