import { defineStore } from "pinia";

export const useRadiusStore = defineStore({
  id: "radius",
  state: () => ({
    radius: Number,
  }),
  getters: {
    getRadius: (state) => state.radius,
  },
  actions: {},
});
