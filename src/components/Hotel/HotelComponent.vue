<template>
  <q-card class="card">
    <q-card-section class="card-section">
      <CarouselComponent :images="hotel?.images" />
      <div>
        <h6>{{ hotel?.name }}</h6>
        <p>{{ hotel?.address.city }}, {{ hotel?.address.fullAddress }}</p>
        <div class="infos">
          <p>{{ calculateMediaEvaluation(hotel?.stars) }}</p>
          <div class="stars-icon">
            <StarComponent :stars="hotel?.stars" />
          </div>
          <p>|</p>
          <IconsComponent
            v-if="hotel?.amenities"
            :amenities="hotel?.amenities"
          />
        </div>
        <q-btn v-if="hotel?.hasRefundableRoom">Reembolsável </q-btn>
      </div>
    </q-card-section>

    <q-card-actions class="card-actions">
      <p>A partir de:</p>
      <p>
        R$ <span>{{ hotel?.price }},00</span>
      </p>
      <br />
      <p>
        R$ <span>{{ hotel?.price }},00</span>/noite
      </p>
      Impostos inclusos
      <q-btn class="primary-button">Selecionar</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CarouselComponent from './CarouselComponent.vue';
import StarComponent from './StarComponent.vue';
import IconsComponent from './IconsComponent.vue';

export default defineComponent({
  name: 'HotelComponent',
  props: {
    hotel: Object,
  },
  components: { CarouselComponent, StarComponent, IconsComponent },
  setup() {
    return {
      amount: ref(5),
    };
  },
  methods: {
    calculateMediaEvaluation(stars: number) {
      if (stars) {
        const minRating = 5;
        const maxRating = 9.9;
        const media = minRating + (stars / 5) * (maxRating - minRating);
        console.log(media);
        return media.toFixed(1);
      } else {
        return 3.1;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '../../css/quasar.variables.scss';

.infos {
  display: flex;
}

.stars-icon {
  display: flex;
  flex-direction: row;
}
.card {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 15px;
}
.primary-button {
  background-color: $primary;
  color: #fff;
  border-radius: 30px;
}
.card-section {
  border: 1px solid red;
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.card-actions {
  display: flex;
  flex-direction: column;
}
</style>
