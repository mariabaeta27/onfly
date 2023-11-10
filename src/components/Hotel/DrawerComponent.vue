<template>
  <q-drawer
    v-if="drawerOpen"
    v-model="drawerOpen"
    bordered
    overlay
    :width="900"
    side="right"
    class="text-accent q-pa-md"
  >
    <q-scroll-area class="fit">
      <div class="assessments">
        <p>{{ calculateMediaEvaluation(hotel?.stars) }}</p>
        <div class="stars-icon">
          <StarComponent :stars="hotel?.stars" />
        </div>
      </div>
      <p class="text-h4 text-black text-weight-bold">{{ hotel?.name }}</p>
      <p>
        {{ hotel?.address.fullAddress }} - {{ hotel?.address.city }} -
        {{ hotel?.address.state }}
      </p>
      <CarouselComponent
        :images="hotel?.images"
        :maxImages="hotel?.images.length"
      />

      <div v-if="hotel?.amenities">
        <p class="text-h5 q-my-md">Facilidades do hotel</p>

        <q-separator size="1px" color="gray" class="q-mb-md" />
        <IconsComponent v-if="hotel?.amenities" :amenities="hotel?.amenities" />

        <q-btn
          class="text-primary text-center"
          outline
          rounded
          style="margin-left: 300px"
          >Mostrar todas as facilidades</q-btn
        >
        <q-separator size="1px" color="gray" class="q-my-md" />
      </div>
      <div>
        <p class="text-h5 q-my-md">Conheça um pouco mais</p>

        <p class="text-justify">{{ hotel.description }}</p>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from 'src/stores/data';
import { computed, defineComponent } from 'vue';
import StarComponent from './StarComponent.vue';
import CarouselComponent from './CarouselDrawerComponent.vue';
import IconsComponent from './IconsComponent.vue';

const data = useStore();
export default defineComponent({
  name: 'DrawerComponent',
  setup() {
    const { getHotelId: hotel } = storeToRefs(data);
    const drawerOpen = computed(() => data.drawerOpen);
    return {
      drawerOpen,
      hotel,
    };
  },
  methods: {
    calculateMediaEvaluation(stars: number | string) {
      if (stars) {
        const minRating = 5;
        const maxRating = 9.9;
        const media = minRating + (+stars / 5) * (maxRating - minRating);
        return media.toFixed(1);
      } else {
        return 3.1;
      }
    },
  },
  components: { StarComponent, CarouselComponent, IconsComponent },
});
</script>

<style lang="scss" scoped>
.assessments {
  display: flex;
}
.stars-icon {
  display: flex;
  flex-direction: row;
}
</style>
