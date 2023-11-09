<template>
  <q-page class="q-ma-lg q-mr-lg q-ml-lg custom">
    <FilterComponent />
    <div v-for="hotel in hotels" :key="hotel.id">
      <HotelComponent :hotel="hotel" />
    </div>
  </q-page>
</template>

<script lang="ts">
import FilterComponent from 'components/FilterComponent.vue';
import HotelComponent from 'components/Hotel/HotelComponent.vue';
import { defineComponent, onMounted, computed } from 'vue';
import { useStore } from '../stores/data';

const data = useStore();

export default defineComponent({
  components: { HotelComponent, FilterComponent },
  setup() {
    const hotels = computed(() => data.getHotels);

    onMounted(() => {
      data.filteredHotels();
    });

    return {
      hotels,
    };
  },
});
</script>

<style scoped>
.q-page {
}
</style>
