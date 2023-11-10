import { defineStore } from 'pinia';
import hotels from '../../data/hotel.json';
import places from '../../data/place.json';
import { Places, orders, Order, Hotels, Hotel } from '../components/models';

function implementPlaces(data: Places[]) {
  return data;
}

export const useStore = defineStore('data', {
  state: () => ({
    hotels: hotels as Hotels[],
    filterHotels: [] as Hotel[],
    places: implementPlaces(places),
    loading: false,
    drawerOpen: false,
    hotel: [] as Hotel[],
    order: orders[0],
    placeId: 1,
    fullVisibilityAmenities: false,
    searchName: '',
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
      this.loading = true;
      const dataFilter = this.hotels.filter(
        ({ placeId }) => this.placeId === placeId
      )[0].hotels;

      this.orderHotels(dataFilter);
      this.filterHotels = dataFilter;
      this.loading = false;
    },

    filteredHotelsName(name: string) {
      this.loading = true;
      this.searchName = name;
      const needle = name.toLocaleLowerCase();

      const dataFilter = this.filterHotels.filter((hotel) =>
        hotel.name.toLocaleLowerCase().includes(needle)
      );

      this.orderHotels(dataFilter);
      this.filterHotels = dataFilter;
      this.loading = false;
    },

    orderHotels(data: Hotel[]) {
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
      this.searchName
        ? this.filteredHotelsName(this.searchName)
        : this.filteredHotels();
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

    setFullVisibilityAmenities() {
      this.fullVisibilityAmenities = !this.fullVisibilityAmenities;
    },
  },
});
