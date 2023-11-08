<template>
  <q-drawer
    v-if="drawerOpen"
    v-model="drawerOpen"
    bordered
    overlay
    :width="500"
    side="right"
  >
    <q-scroll-area class="fit">
      <div class="assessments">
        <p>{{ calculateMediaEvaluation(getHotelId?.stars) }}</p>
        <div class="stars-icon">
          <StarComponent :stars="getHotelId?.stars" />
        </div>
      </div>
      <h1>{{ getHotelId?.name }}</h1>
      <p>
        {{ getHotelId?.address.fullAddress }} - {{ getHotelId?.address.city }} -
        {{ getHotelId?.address.state }}
      </p>
      <CarouselComponent :images="getHotelId?.images" />

      <h4>Facilidades do hotel</h4>
      <p>_______________________________________________</p>
      <IconsComponent
        v-if="getHotelId?.amenities"
        :amenities="getHotelId?.amenities"
      />

      <button>Mostrar todas as facilidades</button>
      <p>_______________________________________________</p>

      <h4>Conheça um pouco mais</h4>

      <p>{{ getHotelId.description }}</p>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useStore } from 'src/stores/data';
import { computed, defineComponent } from 'vue';
import StarComponent from './StarComponent.vue';
import CarouselComponent from './CarouselComponent.vue';
import IconsComponent from './IconsComponent.vue';

const data = useStore();
export default defineComponent({
  name: 'DrawerComponent',
  setup() {
    const { getHotelId } = storeToRefs(data);
    const drawerOpen = computed(() => data.drawerOpen);
    return {
      drawerOpen,
      getHotelId,
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
