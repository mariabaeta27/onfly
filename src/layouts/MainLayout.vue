<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->
    <HeaderComponent />

    <q-drawer v-model="drawerOpen" bordered show-if-above>
      <p>Classificação</p>
      <h1>Melia Paulista</h1>
      <p>Endereço</p>
      <img src="" alt="imagem hotel" />

      <h4>Facilidades do hotel</h4>
      <p>_______________________________________________</p>

      <p>(O que o hotel oferece)</p>
      <button>Mostrar todas as facilidades</button>
      <p>_______________________________________________</p>

      <h4>Conheça um pouco mais</h4>

      <p>Descrição do hotel</p>
      <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
    </q-drawer>

    <div v-if="drawerOpen" @click="closeDrawer" class="drawer-background"></div>

    <q-page-container :class="{ blurred: drawerOpen }" class="main-content">
      <button @click="toggledrawer">Abrir</button>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import HeaderComponent from 'src/components/HeaderComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    HeaderComponent,
  },

  setup() {
    const drawerOpen = ref(false);

    return {
      drawerOpen,
      toggledrawer() {
        drawerOpen.value = !drawerOpen.value;
      },
      closeDrawer() {
        drawerOpen.value = false;
      },
    };
  },
});
</script>

<style scoped>
.q-page-container {
  background-color: #f2f2f2;
  height: 100%;
}
.main-content {
  position: relative;
  transition: filter 0.3s ease;
}

.blurred {
  filter: blur(4px);
}

.q-drawer {
  left: 0;
  width: 300px; /* Largura desejada para o drawer */
  z-index: 1000; /* Certifique-se de que o drawer esteja acima do conteúdo principal */
}

.drawer-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Cor de fundo com transparência */
  z-index: 999; /* Certifique-se de que este elemento esteja abaixo do drawer */
}
</style>
