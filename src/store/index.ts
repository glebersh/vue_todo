import { nanoid } from "nanoid";
import { createStore } from "vuex";

import { TaskList, AddTaskPayload, SelectOption } from "@/types/types";

const initialState: { tasks: TaskList[], filterOptions: SelectOption[] } = {
  tasks: [
    {
      listIndex: nanoid(6),
      displayName: 'New List',
      data: [
        { completed: false, body: 'Feed the dog', id: nanoid(4) }
      ],
      dataFilter: ''
    }
  ],
  filterOptions: [
    { optionTitle: 'Last updated', optionValue: '' },
    { optionTitle: 'Due alphabetical order', optionValue: 'alphabetical' },
    { optionTitle: 'By completed status', optionValue: 'completed' },
  ],
};

export default createStore({
  state: initialState,
  getters: {
    getLists: (state) => {
      return state.tasks;
    }
  },
  mutations: {
    addTask(state, payload: AddTaskPayload): void {
      const targetList = state.tasks.findIndex(item => item.listIndex === payload.listIndex);
      state.tasks[targetList].data.push(payload.data);
    },
    addList(state, payload: TaskList): void {
      state.tasks.push(payload);
    },
    removeList(state, payload: string): void {
      state.tasks = state.tasks.filter(list => list.listIndex !== payload);
    },
    removeTask(state, payload: { taskId: string, listIndex: string }): void {
      const targetList = state.tasks.findIndex(list => list.listIndex === payload.listIndex);
      state.tasks[targetList].data = state.tasks[targetList].data.filter(task => task.id !== payload.taskId);
    },
    renameTask(state, payload: { taskId: string, listIndex: string, newBody: string }): void {
      const targetList = state.tasks.findIndex(list => list.listIndex === payload.listIndex);
      const targetTask = state.tasks[targetList].data.findIndex(task => task.id === payload.taskId);
      state.tasks[targetList].data[targetTask].body = payload.newBody;
    },
    renameList(state, payload: { listIndex: string, newListName: string }): void {
      const targetList = state.tasks.findIndex(list => list.listIndex === payload.listIndex);
      state.tasks[targetList].displayName = payload.newListName;
    },
    toggleCompleted(state, payload: { taskId: string, listIndex: string }): void {
      const targetList = state.tasks.findIndex(list => list.listIndex === payload.listIndex);
      const targetTask = state.tasks[targetList].data.findIndex(task => task.id === payload.taskId);
      const isChecked = state.tasks[targetList].data[targetTask].completed;
      state.tasks[targetList].data[targetTask].completed = !isChecked;
    },
    changeListFilter(state, payload: { filterValue: string, listIndex: string }): void {
      const targetList = state.tasks.findIndex(list => list.listIndex === payload.listIndex);
      state.tasks[targetList].dataFilter = payload.filterValue;
    }
  },
  actions: {
    addTask(context, payload): void {
      context.commit('addTask', payload);
    },
    addList(context, payload): void {
      context.commit('addList', payload);
    },
    removeList(context, payload): void {
      context.commit('removeList', payload);
    },
    removeTask(context, payload): void {
      context.commit('removeTask', payload);
    },
    renameList(context, payload): void {
      context.commit('renameList', payload);
    },
    renameTask(context, payload): void {
      context.commit('renameTask', payload);
    },
    toggleCompleted(context, payload): void {
      context.commit('toggleCompleted', payload);
    },
    changeListFilter(context, payload): void {
      context.commit('changeListFilter', payload);
    },
  },
  modules: {},
});
