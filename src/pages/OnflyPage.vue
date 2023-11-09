<template>
  <q-page class="custom-page">
    <FilterComponent />

    <div v-if="hotels.length !== 0">
      <q-infinite-scroll
        @load="onLoad"
        :initial-index="10"
        :stop="hotels.length === dataHotel.length"
      >
        <div v-for="hotel in hotels" :key="hotel.id">
          <HotelComponent :hotel="hotel" />
        </div>
      </q-infinite-scroll>
    </div>
    <div v-else>
      <p>Nenhum resultado encontrado</p>
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
    const dataHotel = computed(() => data.getHotels);

    const hotels = computed(() => data.getHotels.slice(0, 10));

    onMounted(() => {
      data.filteredHotels();
    });

    const onLoad = (_index: number, done: any) => {
      if (hotels.value.length < dataHotel.value.length) {
        const startIndex = hotels.value.length;
        const lastIndex = startIndex + 10;
        setTimeout(() => {
          hotels.value.push(...data.getHotels.slice(startIndex, lastIndex));
          done();
        }, 1000);
      }
    };

    return {
      hotels,
      onLoad,
      dataHotel,
    };
  },
});
</script>

<style scoped>
.custom-page {
  margin: 50px 350px;
}
</style>
