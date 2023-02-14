<template>
  <TransitionGroup name="cards" tag="div" class="flex cards-container">
    <TaskCard v-for="list in tasksList" :key="list.listIndex" :list="list" class="list-card"
      :searchbarData="searchbarData" @toggleModal="$emit('update:isModalWindowVisible', true)"
      @changeList="$emit('update:currentList', list.listIndex)" />
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskCard from '../TaskCard/TaskCard.vue';
import { Task, TaskList } from '@/types/types';

export default defineComponent({
  name: 'ListsContainer',
  props: {
    isModalWindowVisible: { type: Boolean },
    currentList: { type: String },
    searchbarData: { type: String, default: '' },
  },
  components: { TaskCard },
  computed: {
    tasksList() {
      if (this.searchbarData) {
        return this.$store.state.tasks
          .filter((list: TaskList) => list.data.filter((task: Task) => task.body.toLowerCase().includes(this.searchbarData.toLowerCase())).length > 0);
      }
      else return this.$store.state.tasks;
    }
  }
});
</script>

<style>
.searchbar-container {
  gap: 3em;
}

.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-col {
  flex-direction: column;
}

.cards-container {
  width: 80%;
  margin: 0 auto;
  gap: 2em;
}

.cards-enter-active,
.cards-leave-active {
  transition: all 0.5s ease;
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
