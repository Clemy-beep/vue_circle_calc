import { defineStore } from "pinia";

export const useRadiusStore = defineStore({
  id: "radius",
  state: () => ({
    radius: Number,
  }),
  getters: {
    getStats: (state) => state.radius,
  },
  actions: {},
});
