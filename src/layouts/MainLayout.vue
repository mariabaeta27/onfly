<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent />

    <DrawerComponent />

    <div v-if="drawerOpen" @click="closeDrawer" class="drawer-background"></div>

    <q-page-container :class="{ blurred: drawerOpen }" class="main-content">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/stores/data';

const data = useStore();

import HeaderComponent from 'src/components/HeaderComponent.vue';
import DrawerComponent from 'src/components/Hotel/DrawerComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    HeaderComponent,
    DrawerComponent,
  },

  setup() {
    const drawerOpen = computed(() => data.drawerOpen);
    const closeDrawer = () => {
      data.closeDrawer();
    };
    return {
      drawerOpen,
      closeDrawer,
    };
  },
});
</script>

<style scoped lang="scss">
@import '../css/quasar.variables.scss';
.main-content {
  position: relative;
  transition: filter 0.3s ease;
}

.blurred {
  filter: blur(4px);
}

.drawer-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
</style>
