<template>
  <div v-for="n in amount" :key="n">
    <q-icon name="star" :class="{ star: n <= stars }" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    stars: Number,
  },

  setup() {
    return {
      amount: ref(5),
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../css/quasar.variables.scss';
.star {
  color: $warning;
}
</style>
