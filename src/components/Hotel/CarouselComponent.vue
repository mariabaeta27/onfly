<template>
  <div class="q-pa-md">
    <q-carousel arrows animated v-model="slide" height="400px">
      <q-carousel-slide
        v-for="(image, index) in images"
        :key="index"
        :name="index"
        :img-src="image"
      >
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    images: [],
  },

  setup() {
    return {
      slide: ref(0),
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
