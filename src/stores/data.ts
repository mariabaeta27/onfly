import { defineStore } from 'pinia';
import hotels from '../../data/hotel.json';
import places from '../../data/place.json';
import { Places, orders, Order } from '../components/models';

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
    order: orders[0],
    placeId: 1,
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

    filteredHotels() {
      console.log('AQUI no filter', this.placeId);
      const dataFilter = this.hotels.filter(
        ({ placeId }) => this.placeId === placeId
      )[0].hotels;

      this.orderHotels(dataFilter);
      this.filterHotels = dataFilter;
    },

    orderHotels(data) {
      if (this.order.value === 'best_rated') {
        data.sort((hotelA, hotelB) => {
          return Number(hotelB.stars) - Number(hotelA.stars);
        });
        return;
      }
      data.sort((hotelA, hotelB) => {
        return Number(hotelA.price) - Number(hotelB.price);
      });
      return;
    },

    setOrder(value: Order) {
      this.order = value;
      this.filteredHotels();
    },

    setPlaceId(value: number) {
      this.placeId = value;
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
