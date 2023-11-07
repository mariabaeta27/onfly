<template>
  <div>
    <img src="" alt="imagem do hotel" />
    <div>
      <h3>Melia Paulista</h3>
      <p>Endereço</p>
      <p>Classificação e Icones</p>
      <button>Reembolsável</button>
    </div>
    <div>
      <p>A partir de:</p>
      <p>R$ <span>1.332,00</span></p>
      <p>R$444,00/noite</p>
      Impostps inclusos
    </div>
    <button>Selecionar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HotelComponent',
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
