import { defineStore } from 'pinia';
import hotels from '../../data/hotel.json';
import place from '../../data/place.json';

export const useStore = defineStore('data', {
  state: () => ({
    hotels,
    filterHotels: [],
    place,
    placeId: 1,
    loading: true,
  }),

  getters: {
    // getPlace(state) {
    //   return state.place;
    // },
    getHotels(state) {
      return state.filterHotels;
    },
  },

  actions: {
    setFalseLoading() {
      this.loading = false;
    },
    filteredHotels() {
      const dataFilter = this.hotels.filter(
        ({ placeId }) => this.placeId === placeId
      )[0].hotels;

      this.filterHotels = dataFilter;
    },
  },
});
