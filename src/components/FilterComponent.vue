<template>
  <div class="custom-filter">
    <div class="card">
      <h3>Reservar hotel</h3>
      <p>____________________________________</p>
      <label
        >Destino
        <p>*</p>
      </label>
      <input type="text" />

      <button>Alterar busca</button>
    </div>

    <div class="complement">
      <p>Início > Hotéis > Hospedagem em Belo Horizonte</p>
      <p>
        Organizar por
        <span>(Input do tipo select) Recomendados</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FilterComponent',
  setup() {
    return {};
  },
});
</script>

<style scoped>
.custom-filter {
  border: black 1px solid;
}
</style>
