import { defineStore } from 'pinia';
import place from '../../data/place.json';

export const useCounterStore = defineStore('place', {
  state: () => ({
    place: place,
  }),

  getters: {
    getPlace(state) {
      return state.place;
    },
  },

  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
