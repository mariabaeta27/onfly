<template>
  <div class="custom-filter">
    <q-card>
      <div class="text-h5 q-px-md q-py-sm title">Reservar hotel</div>
      <q-separator size="1px" color="dark" />

      <div class="q-pa-md">
        <p class="label">Destino<span class="destiny-span">*</span></p>
        <q-form @submit="onSubmit">
          <q-select
            dense
            outlined
            v-model="modelSearch"
            :options="options"
            emit-value
            minLength="3"
            clearable
            hide-dropdown-icon
            use-input
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section> Resultado não encontrado </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="button">
            <q-btn
              :disable="!modelSearch"
              type="submit"
              color="primary"
              rounded
              class="q-mt-sm"
            >
              {{ textButton }}
            </q-btn>
          </div>
        </q-form>
      </div>
    </q-card>

    <div class="complement">
      <p>
        Início > Hotéis >
        <span> Hospedagem em {{ city }}</span>
      </p>

      <q-select v-model="modelOrder" :options="optionsOrders" stack-label>
        <template v-slot:selected>
          Organizar por
          <q-chip
            v-if="modelOrder"
            dense
            square
            text-color="primary"
            class="q-my-none q-ml-xs q-mr-none"
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
    const city: Ref<string | undefined> = ref('Belo Horizonte');

    const textButton = computed(() =>
      reResearch.value ? 'Alterar busca' : 'Buscar'
    );

    const filterFn = (
      val: string,
      update: (
        callbackFn: () => void,
        afterFn?: ((ref: QSelect) => void) | undefined
      ) => void
    ) => {
      if (val === '') {
        update(() => {
          options.value = placesOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLocaleLowerCase();
        options.value = placesOptions.filter((place) =>
          place.value.toLocaleLowerCase().includes(needle)
        );
      });
    };

    const onSubmit = () => {
      reResearch.value = true;

      const placeId = placesOptions.find(
        (place) => place.value === modelSearch.value
      )?.category;

      data.setPlaceId(Number(placeId));

      const filterCity = places.value.find(
        (place) => place.placeId === placeId
      )?.name;

      city.value = filterCity;

      data.filteredHotels();
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

.title {
  font-weight: 500;
}

.label {
  font-weight: bold;
  color: $accent;
  margin: 0;
}

.label span {
  color: red;
}

.button {
  display: flex;
  justify-content: end;
}
</style>
