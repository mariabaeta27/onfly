<template>
  <q-card class="card q-mt-lg" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="custom-card-section">
        <CarouselComponent
          :images="hotel?.images"
          :maxImages="hotel?.images.length"
        />
        <div class="q-ma-lg text-weight-bold text-accent">
          <span class="text-h6 text-black text-weight-bolder">{{
            hotel?.name
          }}</span>
          <p class="text-accent">
            {{ hotel?.address.city }}, {{ hotel?.address.fullAddress }}
          </p>

          <div class="descriptions-amenities">
            <p>
              {{ calculateMediaEvaluation(hotel?.stars) }}
            </p>

            <div class="stars-icon">
              <StarComponent :stars="hotel?.stars" />
            </div>
            <p class="q-pr-sm">|</p>

            <IconsComponent
              v-if="hotel?.amenities"
              :amenities="hotel?.amenities"
            />
          </div>
          <q-chip
            square
            color="secondary"
            text-color="white"
            v-if="hotel?.hasRefundableRoom"
            >Reembolsável
          </q-chip>
        </div>
      </q-card-section>

      <q-separator vertical size="1px" color="gray" class="custom-separator" />

      <q-card-actions
        class="custom-q-card-actions q-mx-md text-secondary q-pa-xm"
      >
        <span class="text-caption">A partir de:</span>
        <p>
          R$
          <span class="text-h4 text-weight-bold">{{ hotel?.price }},00</span>
        </p>

        <div>
          <p>
            R$ <span>{{ hotel?.price }},00</span>/noite
          </p>
          <p>Impostos inclusos</p>
        </div>

        <q-btn
          class="primary-button q-mt-xl custom-q-btn"
          @click="toggleDrawer(hotel?.id)"
          >Selecionar</q-btn
        >
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import CarouselComponent from './CarouselComponent.vue';
import StarComponent from './StarComponent.vue';
import IconsComponent from './IconsComponent.vue';

import { useStore } from 'src/stores/data';

const data = useStore();

export default defineComponent({
  name: 'HotelComponent',
  props: {
    hotel: Object,
  },
  components: { CarouselComponent, StarComponent, IconsComponent },
  setup() {
    const amount = ref(5);
    const drawerOpen = computed(() => data.drawerOpen);
    return {
      amount,
      drawerOpen,
    };
  },
  methods: {
    calculateMediaEvaluation(stars: string) {
      if (stars) {
        const minRating = 5;
        const maxRating = 9.9;
        const media = minRating + (Number(stars) / 5) * (maxRating - minRating);
        return media.toFixed(1);
      } else {
        return 3.1;
      }
    },
    toggleDrawer(id: number) {
      data.openDrawer(id);
      this.drawerOpen = data.drawerOpen;
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../css/quasar.variables.scss';

p {
  margin: 0;
}

.custom-q-btn {
  width: 150px;
}

.custom-separator {
  height: 250px;
}

.descriptions-amenities {
  display: flex;
  align-items: center;
}

.stars-icon {
  display: flex;
  flex-direction: row;
  margin: 0 10px;
}
.amenities {
  display: flex;
}
.card {
  height: 250px;
}
.primary-button {
  background-color: $primary;
  color: #fff;
  border-radius: 30px;
}
.custom-card-section {
  display: flex;
  width: 80%;
  padding: 0;
}
.custom-q-card-actions {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
