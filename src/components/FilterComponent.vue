<template>
  <div class="custom-filter">
    <q-card class="card">
      <h6>Reservar hotel</h6>
      <q-separator />
      <p>Destino <span class="destiny-span">*</span></p>

      <q-form @submit="onSubmit">
        <q-input
          dense
          outlined
          clearable
          clear-icon="close"
          v-model="destiny"
          label="Destino"
        />

        <div>
          <q-btn type="submit" color="primary">{{
            destiny.length === 0 ? 'Buscar' : 'Alterar busca'
          }}</q-btn>
        </div>
      </q-form>
    </q-card>

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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterComponent',

  setup() {
    const destiny = ref('');

    const onSubmit = () => {
      console.log(destiny);
    };

    return {
      destiny,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.destiny-span {
  color: red;
}
</style>
