<template>
  <VBlock :flex="'col'" :size="'md'" style="margin-top: 4em;" :colorScheme="'#B0B0B070'" class="list-card">
    <h3 class="list-title">
      {{ list?.displayName }}
    </h3>

    <i class="bi bi-three-dots-vertical settings-icon"
      @click="$emit('toggleModal'), $emit('changeList', list?.listIndex)"></i>

    <TransitionGroup name="card-animation" tag="ul" class="default-list tasks-list">
      <li v-for="task in tasks" :key="task.id" class="tasks-list-item"
        :class="currentList.data[currentList.data.findIndex((item: Task) => item.id === task.id)].completed && 'task-completed'">

        <VCheckbox @click="toggleCompleted(task.id)"
          :isChecked="currentList.data[currentList.data.findIndex((item: Task) => item.id === task.id)].completed" />

        <span v-if="!isTaskBodyEditing || task.id !== currentTask">{{ task.body }}</span>
        <VTextInput v-if="isTaskBodyEditing && currentTask === task.id" @input="setTaskBody" />
        <div class="task-buttons-wrapper">
          <i class="bi bi-pencil-square task-edit-icon"
            @click="isTaskBodyEditing = !isTaskBodyEditing, currentTask = task.id"
            v-if="!isTaskBodyEditing || task.id !== currentTask"></i>
          <i class="bi bi-trash3 tasks-list-delete-icon"
            @click="$store.dispatch('removeTask', { taskId: task.id, listIndex: list?.listIndex })"
            v-if="!isTaskBodyEditing || task.id !== currentTask"></i>
        </div>
        <i class="bi bi-save task-save-icon" v-if="isTaskBodyEditing && currentTask === task.id"
          @click="editTaskBody(task.id)" />
      </li>
    </TransitionGroup>

    <VTextInput v-model:modelValue="inputValue" class="task-body-input" :colorScheme="'#B0B0B070'"
      :placeholder="'Input task body'" @onEnter="addTask" />
    <VButton @click="addTask" :disabled="!inputValue.length" class="add-task-button" :colorScheme="'#B0B0B070'">
      Add new task
    </VButton>
  </VBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { nanoid } from 'nanoid';

import store from '../../store/index';
import { Task, TaskList } from "@/types/types";
import { VBlock, VButton, VTextInput, VCheckbox } from '../UI';

export default defineComponent({
  name: "TaskCard",
  data() {
    return {
      inputValue: '',
      isTaskBodyEditing: false,
      newTaskBody: '',
      currentTask: '',
      currentList: this.defineList(),
    }
  },
  props: {
    list: { type: Object },
    isModalWindowVisible: { type: Boolean },
    searchbarData: { type: String, default: '' },
  },
  computed: {
    tasks() {
      if (this.list?.dataFilter === 'alphabetical') {
        return [...this.list?.data]
          .filter((task: Task) => task.body.toLowerCase().includes(this.searchbarData?.toLowerCase()))
          .sort((task1: Task, task2: Task) => task1.body.localeCompare(task2.body));
      }
      else if (this.list?.dataFilter === 'completed') {
        return [...this.list?.data]
          .filter((task: Task) => task.body.toLowerCase().includes(this.searchbarData?.toLowerCase()))
          .filter((task: Task) => task.completed);
      }
      else {
        return [...this.list?.data]
          .filter((task: Task) => task.body.toLowerCase().includes(this.searchbarData?.toLowerCase()));
      }
    }
  },
  methods: {
    defineList(): TaskList {
      const targetList = this.$store.state.tasks.findIndex((list: TaskList) => list.listIndex === this?.list?.listIndex);
      return this.$store.state.tasks[targetList];
    },
    addTask() {
      if (this.inputValue.length) {
        store.dispatch('addTask', {
          data: {
            completed: false,
            body: this.inputValue,
            id: nanoid(4),
            priorityLevel: 'Low'
          },
          listIndex: this?.list?.listIndex,
        });
        this.inputValue = '';
      }
    },
    inputHandler(event: Event): void {
      const targetElement = event!.target as HTMLInputElement;
      this.inputValue = targetElement.value;
    },
    deleteTask(taskId: string): void {
      store.dispatch('removeTask', { taskId, listIndex: this?.list?.listIndex });
    },
    setTaskBody(event: Event): void {
      const targetElement = event!.target as HTMLInputElement;
      this.newTaskBody = targetElement.value;
    },
    toggleCompleted(taskId: string): void {
      store.dispatch('toggleCompleted', { taskId, listIndex: this?.list?.listIndex });
    },
    editTaskBody(taskId: string): void {
      if (this.newTaskBody.length) {
        store.dispatch('renameTask', { taskId, listIndex: this?.list?.listIndex, newBody: this.newTaskBody });
        this.isTaskBodyEditing = false;
        this.newTaskBody = '';
        this.currentTask = '';
      }
      else {
        this.isTaskBodyEditing = false;
        this.currentTask = '';
      }
    },
  },
  components: { VBlock, VTextInput, VButton, VCheckbox }
});
</script>

<style>
.task-completed {
  color: lightgray;
}

.default-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-card {
  background-color: rgba(250, 250, 250, 0.24);
  min-width: 250px;
  transition: height 0.33s;
}

.tasks-list {
  width: 100%;
}

.tasks-list-item {
  text-transform: uppercase;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tasks-list-item:not(:first-of-type) {
  margin-top: 1em;
}

.tasks-list-delete-icon {
  transition: all 0.33s ease-in-out;
  color: rgb(221, 2, 2);
  font-size: 1.25em;
}

.tasks-list-delete-icon:hover {
  color: rgb(201, 2, 2);
  cursor: pointer;
}

.settings-icon {
  font-size: 2em;
  position: relative;
  bottom: 65px;
  left: 115px;
  transition: all 0.33s;
}

.settings-icon:hover {
  color: #4386d3;
  cursor: pointer;
}

.settings-icon:active {
  transform: scale(0.94, 0.94);
}

.task-buttons-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  gap: .5em;
}

.task-body-input {
  margin-top: 2em;
}

.add-task-button {
  margin: 2em 0 1em;
  color: black;
}

.task-edit-icon {
  transition: all 0.33s;
}

.task-edit-icon:hover {
  cursor: pointer;
  color: #4386d3;
}

.task-save-icon {
  transition: all 0.33s;
  margin-left: 1em;
}

.task-save-icon:hover {
  cursor: pointer;
  color: #4386d3;
}

.task-body-input {
  width: 80%;
  padding: 6px 15px;
}

.card-animation-enter-active,
.card-animation-leave-active {
  transition: all 0.5s ease;
}

.card-animation-enter-from,
.card-animation-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>