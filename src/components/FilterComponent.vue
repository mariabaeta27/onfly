<template>
  <div class="custom-filter">
    <q-card>
      <div class="text-h5 q-px-md q-py-sm text-weight-bold">Reservar hotel</div>
      <q-separator size="1px" color="dark" />

      <div class="q-pa-md">
        <p class="text-accent text-weight-bolder">
          Destino<span class="destiny-span text-red">*</span>
        </p>
        <q-form @submit="onSubmit">
          <q-select
            dense
            outlined
            v-model="modelSearch"
            :options="options"
            emit-value
            clearable
            hide-dropdown-icon
            use-input
            @filter="filterFn"
            :disable="modelFilterName"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section> Resultado não encontrado </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            dense
            outlined
            v-model="modelSearchName"
            class="q-mt-md"
            label="Nome do hotel"
            v-if="modelFilterName"
          ></q-input>

          <q-toggle
            v-model="modelFilterName"
            color="primary"
            keep-color
            label="Filtar por nome"
          />
          <div class="button">
            <q-btn type="submit" color="primary" rounded class="q-mt-sm">
              {{ textButton }}
            </q-btn>
          </div>
        </q-form>
      </div>
    </q-card>

    <div class="complement q-py-md">
      <p class="text-weight-bold text-primary">
        Início > Hotéis >
        <span class="text-accent"> Hospedagem em {{ city }}</span>
      </p>
      <q-select v-model="modelOrder" :options="optionsOrders" stack-label dense>
        <template v-slot:selected>
          Organizar por
          <q-chip
            v-if="modelOrder"
            dense
            color="transparent"
            text-color="primary"
          >
            {{ modelOrder.label }}
          </q-chip>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref } from 'vue';
import { orders, Places } from './models';
import { useStore } from 'src/stores/data';
import { QSelect } from 'quasar';

const data = useStore();

const places = computed(() => data.getPlaces);

const placesOptions = places.value.map((place: Places) => ({
  label: `${place.name}, ${place.state.name}`,
  value: `${place.name}, ${place.state.shortname}`,
  category: place.placeId,
}));

export default defineComponent({
  name: 'FilterComponent',

  setup() {
    const modelSearch = ref(null);
    const options = ref(placesOptions);
    const reResearch = ref(false);
    const optionsOrders = orders;
    const modelOrder = ref(orders[0]);
    const modelFilterName = ref(false);
    const modelSearchName = ref('');
    const city: Ref<string | undefined> = ref('Belo Horizonte');

    const textButton = computed(() =>
      reResearch.value ? 'Alterar busca' : 'Buscar'
    );

    const filterFn = (
      value: string,
      update: (
        callbackFn: () => void,
        afterFn?: ((ref: QSelect) => void) | undefined
      ) => void
    ) => {
      if (value === '') {
        update(() => {
          options.value = placesOptions;
        });
        return;
      }
      update(() => {
        const needle = value.toLocaleLowerCase();
        options.value = placesOptions.filter((place) =>
          place.label.toLocaleLowerCase().includes(needle)
        );
      });
    };

    const onSubmit = () => {
      reResearch.value = true;
      if (modelFilterName.value) {
        data.filteredHotelsName(modelSearchName.value);
      } else {
        const placeId = placesOptions.find(
          (place) => place.value === modelSearch.value
        )?.category;

        data.setPlaceId(Number(placeId));

        const filterCity = places.value.find(
          (place) => place.placeId === placeId
        )?.name;

        city.value = filterCity;
        data.filteredHotels();
      }
    };

    return {
      modelSearch,
      onSubmit,
      options,
      filterFn,
      textButton,
      reResearch,
      city,
      optionsOrders,
      modelOrder,
      modelFilterName,
      modelSearchName,
    };
  },

  watch: {
    modelOrder() {
      data.setOrder(this.modelOrder);
    },
  },
});
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';

.button {
  display: flex;
  justify-content: end;
}

.complement {
  display: flex;
  justify-content: space-between;
}
</style>
