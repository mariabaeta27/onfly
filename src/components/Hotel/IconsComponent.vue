<template>
  <div class="amenities-list">
    <div class="amenity" v-for="amenity in amenities" :key="amenity?.key">
      <q-icon v-if="amenity" :name="getAmenityIcon(amenity?.key)" />
      <p v-if="isDrawer">{{ amenity?.label }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';

import { useStore } from 'src/stores/data';
const data = useStore();

export default {
  props: {
    amenities: Array,
  },

  setup() {
    const showAmenitis = [];
    console.log(this);
    const isDrawer = computed(() => data.drawerOpen);
    return {
      isDrawer,
    };
  },

  methods: {
    getAmenityIcon(key: string) {
      const iconMapping = {
        WI_FI: 'wifi',
        RESTAURANT: 'restaurant',
        ROOM_SERVICE: 'room_service',
        PUB: 'sports_bar',
        POOL: 'pool',
        PETS: 'pets',
        AIR_CONDITIONING: 'air',
        SAFE: 'lock',
        PARKING: 'local_parking',
        LAUNDRY: 'local_laundry_service',
        BREAKFAST: 'free_breakfast',
        FITNESS_CENTER: 'fitness_center',
        MEETING_ROOM: 'meeting_room',
        STEAM_ROOM: 'hot_tub',
        SPA: 'spa',
        TRANSFER: 'local_taxi',
        ROOM_TV: 'desktop_window',
        RECEPTION_24_HOURS: 'schedule',
        STAGE: 'approval',
        AUDITORIUM: 'room_preferences',
        MASSAGE: 'spa',
        ACEPTED_CAR_CREDIT: 'credit_card',
      };
      return iconMapping[key];
    },
  },
};
</script>

<style>
.amenities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.amenity {
  display: flex;
}
</style>
