import { defineStore } from 'pinia';
import hotels from '../../data/hotel.json';

export const useCounterStore = defineStore('hotel', {
  state: () => ({
    hotels: hotels,
  }),

  getters: {
    getHotels(state) {
      return state.hotels;
    },
  },

  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
