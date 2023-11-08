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
    drawerOpen: false,
    hotel: [],
  }),

  getters: {
    getHotels(state) {
      return state.filterHotels;
    },
    isDrawerOpen(state) {
      return state.drawerOpen;
    },
    getHotelId(state) {
      console.log('Maria 3', state.hotel[0]);
      return state.hotel[0];
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

    getHotel(id: number) {
      this.hotel = this.filterHotels.filter((hotel) => hotel.id === id);
    },

    openDrawer(id: number) {
      this.drawerOpen = true;
      this.getHotel(id);
    },

    closeDrawer() {
      this.drawerOpen = false;
    },
  },
});
