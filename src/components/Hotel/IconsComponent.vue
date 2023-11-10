<template>
  <div class="amenities-list">
    <div class="amenity" v-for="amenity in showAmenities" :key="amenity?.key">
      <q-icon v-if="amenity" :name="getAmenityIcon(amenity?.key)" />
      <p v-if="isDrawer">{{ amenity?.label }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { Amenity } from '../models';

import { useStore } from 'src/stores/data';
const data = useStore();

export default {
  props: {
    amenities: {
      type: Array as () => Amenity[],
      required: true,
    },
  },

  setup() {
    const isDrawer = computed(() => data.drawerOpen);
    const fullVisibilityAmenities = computed(
      () => data.fullVisibilityAmenities
    );
    const showAmenities = ref<Amenity[]>([]);

    const getAmenityIcon = (key: string) => {
      const iconMapping: Record<string, string> = {
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
    };
    const addAmenities = () => {
      const startIndex = showAmenities.value.length;
      const lastIndex = startIndex + (showAmenities.value.length - 3);
      if (lastIndex > startIndex) {
        setTimeout(() => {
          showAmenities.value.push(
            ...showAmenities.value?.slice(startIndex, lastIndex)
          );
        }, 500);
      }
    };

    return {
      isDrawer,
      showAmenities,
      fullVisibilityAmenities,
      getAmenityIcon,
      addAmenities,
    };
  },

  methods: {},

  created() {
    if (this.isDrawer) {
      this.showAmenities = this.amenities.slice(0, 3);
    } else {
      this.showAmenities = this.amenities;
    }
  },

  watch: {
    fullVisibilityAmenities() {
      this.addAmenities();
      console.log(this.showAmenities);
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
