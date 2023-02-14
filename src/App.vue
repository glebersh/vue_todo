<template>
  <div id="app" class="app">
    <AppHeader>
      <VButton @click="addList" class="add-list-button" :colorScheme="'#B0B0B070'" style="background-color: #FDFDFD">
        Add List
      </VButton>
      <div class="searchbar-container">
        <VTextInput v-model:modelValue="searchbarData" style="background-color: #FDFDFD; width: 100%"
          :colorScheme="'#B0B0B070'" :searchbarData="searchbarData" />
        <i class="bi bi-search search-icon"></i>
      </div>
    </AppHeader>
    <ListsContainer v-model:currentList="currentList" v-model:isModalWindowVisible="isModalWindowVisible"
      :searchbarData="searchbarData" />
    <ModalWindow v-model:isModalWindowVisible="isModalWindowVisible" :currentList="currentList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalWindow from './components/ModalWindow/ModalWindow.vue';
import ListsContainer from './components/ListsContainer/ListsContainer.vue';
import AppHeader from './components/Header/Header.vue';
import store from '@/store';

import { nanoid } from 'nanoid';
import { VTextInput, VButton, VSelect } from './components/UI';

export default defineComponent({
  name: 'App',
  data() {
    return {
      isModalWindowVisible: false,
      currentList: store.state.tasks[0].listIndex,
      searchbarData: '',
    }
  },
  methods: {
    addList() {
      store.dispatch('addList', {
        listIndex: nanoid(6),
        displayName: 'New list',
        data: [],
        dataFilter: '',
      })
    },
  },
  components: { ListsContainer, ModalWindow, AppHeader, VTextInput, VButton }
});
</script>

<style>
#app,
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

.header {
  width: 100%;
  padding: 20px 0;
  min-height: 80px;
  background-color: #4386d3;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  box-shadow: 0px 3px 10px rgb(187, 187, 187);
}

.searchbar-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
}

.search-icon {
  font-size: 16px;
  pointer-events: none;
  position: absolute;
  margin-right: 10px;
  margin-top: 0px;
}
</style>
