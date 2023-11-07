<template>
  <q-page class="q-ma-lg q-mr-lg q-ml-lg custom">
    <FilterComponent />
    <HotelComponent />
  </q-page>
</template>

<script lang="ts">
import HotelComponent from 'components/HotelComponent.vue';
import FilterComponent from 'components/FilterComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { HotelComponent, FilterComponent },
});
</script>

<style scoped>
.q-page {
}
</style>
