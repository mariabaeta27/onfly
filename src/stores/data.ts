import { defineStore } from 'pinia';
import hotels from '../../data/hotel.json';
import places from '../../data/place.json';
import { Places } from '../components/models';

function implementPlaces(data: Places[]) {
  return data;
}

export const useStore = defineStore('data', {
  state: () => ({
    hotels,
    filterHotels: [],
    places: implementPlaces(places),
    loading: true,
    drawerOpen: false,
    hotel: [],
  }),

  getters: {
    getPlaces(state) {
      return state.places;
    },

    getHotels(state) {
      return state.filterHotels;
    },
    isDrawerOpen(state) {
      return state.drawerOpen;
    },
    getHotelId(state) {
      return state.hotel[0];
    },
  },

  actions: {
    setFalseLoading() {
      this.loading = false;
    },

    filteredHotels(id: number) {
      const dataFilter = this.hotels.filter(({ placeId }) => id === placeId)[0]
        .hotels;

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
