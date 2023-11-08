<template>
  <q-header elevated class="custom-header">
    <q-img
      src="../assets/OnflyLogo.png"
      alt="Logo Onfly"
      width="100px"
      class="custom-image"
    >
    </q-img>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent',
});
</script>

<style scoped>
.custom-header {
  background-color: #ffff;
}
.custom-image {
  margin: 5px 30px;
}
</style>
