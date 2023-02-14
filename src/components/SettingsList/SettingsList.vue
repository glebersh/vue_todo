<template>
  <div class="flex flex-col settings-container">
    <div class="settings-content">
      <h4>{{ currentListName }}</h4>
      <ul class="default-list">
        <li @click="isNameEditing = !isNameEditing">Change List Name</li>
        <VTextInput type="text" v-if="isNameEditing" class="list-rename-input" @input="setNewListName"
          @onEnter="editListName" :colorScheme="'#B0B0B070'" />
        <li style="color: lightgray">Change Color</li>
        <li @click="isSortMenuVisible = !isSortMenuVisible">Sort by</li>
        <ul v-if="isSortMenuVisible" class="default-list">
          <VSelect :selectOptions="$store.state.filterOptions" :toggleFunction="'changeFilter'"
            @changeFilter="changeFilter" />
        </ul>
      </ul>
    </div>
    <VButton class="list-delete-button" :colorScheme="'#B0B0B070'" @click="deleteList">Delete this list</VButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TaskList } from "@/types/types";
import store from '@/store';
import { VButton, VSelect, VTextInput } from '../UI';
export default defineComponent({
  name: "SettingsList",
  data() {
    return {
      isSortMenuVisible: false,
      currentListName: this.displayListName(),
      isNameEditing: false,
      newListName: '',
    };
  },
  methods: {
    displayListName() {
      const targetList = this.$store.state.tasks.findIndex((list: TaskList) => list.listIndex === this.currentList);
      return targetList >= 0 && this.$store.state.tasks[targetList].displayName;
    },
    setNewListName(event: Event): void {
      const targetElement = event!.target as HTMLInputElement;
      this.newListName = targetElement.value;
    },
    editListName(): void {
      const targetList = this.$store.state.tasks.findIndex((list: TaskList) => list.listIndex === this.currentList);
      store.dispatch('renameList', { listIndex: this.$store.state.tasks[targetList].listIndex, newListName: this.newListName });
      this.isNameEditing = false;
      this.newListName = '';
    },
    deleteList(): void {
      const targetList = this.$store.state.tasks.findIndex((list: TaskList) => list.listIndex === this.currentList);
      store.dispatch('removeList', this.$store.state.tasks[targetList].listIndex);
      this.$emit('toggleModalWindow', false);
    },
    changeFilter(payload: string): void {
      store.dispatch('changeListFilter', { filterValue: payload, listIndex: this.currentList });
    }
  },
  props: {
    isModalWindowVisible: { type: Boolean },
    currentList: { type: String },
  },
  components: { VTextInput, VButton, VSelect }
});
</script>

<style>
.list-rename-input {
  width: 90%;
  margin: 1em auto;
}

.settings-container {
  align-items: flex-start;
  justify-content: flex-start;
}

.settings-content {
  width: 100%;
  height: 250px;
}

.list-delete-button {
  margin-top: auto;
}

.default-list li:hover {
  cursor: pointer;
}
</style>