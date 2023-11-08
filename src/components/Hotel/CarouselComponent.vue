<template>
  <div class="q-pa-md">
    <q-carousel arrows animated v-model="slide" height="400px">
      <q-carousel-slide
        v-for="(image, index) in images"
        :key="index"
        :name="index"
        :img-src="image"
      >
        <p v-if="isDrawer" class="q-mt-md text-center absolute-bottom slide">
          {{ slide + 1 }} / {{ maxImages }}
        </p>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'src/stores/data';
const data = useStore();
export default {
  props: {
    images: [],
    maxImages: ref(0),
  },

  setup() {
    const isDrawer = computed(() => data.drawerOpen);
    return {
      slide: ref(0),
      isDrawer,
    };
  },
};
</script>

<style lang="scss" scoped>
.slide {
  background-color: white;
}
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
