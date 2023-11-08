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
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from '../stores/data';

const data = useStore();

export default defineComponent({
  components: { HotelComponent, FilterComponent },
  setup() {
    const hotels = ref([]);

    onMounted(() => {
      data.filteredHotels();

      hotels.value = data.getHotels;
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
