<template>
  <q-carousel
    animated
    v-model="slide"
    height="250px"
    class="rounded-borders custom-q-carousel"
    ref="carousel"
  >
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

    <template v-slot:control>
      <q-carousel-control
        position="bottom-left"
        :offset="[18, 18]"
        class="q-gutter-xs custom-carousel-control"
      >
        <q-btn
          push
          round
          dense
          color="white"
          text-color="black"
          icon="arrow_left"
          @click="$refs.carousel.previous()"
        />
        <q-btn
          push
          round
          dense
          color="white"
          text-color="black"
          icon="arrow_right"
          @click="$refs.carousel.next()"
          style="margin-right: 40px"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
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
.custom-carousel-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
}

.custom-q-carousel {
  width: 400px;
}
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
