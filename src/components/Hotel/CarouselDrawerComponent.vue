<template>
  <q-carousel
    animated
    v-model="slide"
    height="400px"
    class="rounded-borders custom-q-carousel"
    ref="carousel"
    style="margin-left: 20px"
  >
    <q-carousel-slide
      v-for="(image, index) in images"
      :key="index"
      :name="index"
      :img-src="image"
    >
      <q-chip
        size="18px"
        class="bg-black text-white absolute-bottom-right custom-q-chip"
        style="margin-right: 400px"
      >
        {{ slide + 1 }} / {{ maxImages }}
      </q-chip>
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
          style="margin-right: 60px"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    images: [],
    maxImages: ref(0),
  },

  setup() {
    return {
      slide: ref(0),
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-q-chip {
  opacity: 0.8;
}
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
  width: 820px;
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
