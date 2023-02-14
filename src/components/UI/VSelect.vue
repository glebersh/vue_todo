<template>
  <div class="select-container">
    <select @change="toggleSelect" class="custom-select" @click="isOpen = !isOpen">
      <option v-for="(option, index) in selectOptions" :key="option.optionValue" :value="option.optionValue"
        :selected="!index">
        {{ option.optionTitle }}
      </option>
    </select>
    <i :class="isOpen ? 'bi bi-chevron-down dropdown-icon is-opened' : 'bi bi-chevron-down dropdown-icon'"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SelectOption } from '@/types/types';

export default defineComponent({
  name: 'VSelect',
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    selectOptions: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    toggleFunction: {
      type: String,
      required: true,
    }
  },
  methods: {
    toggleSelect(event: Event) {
      const select = event.currentTarget as HTMLSelectElement;
      if (this.toggleFunction !== undefined) {
        this.$emit(this.toggleFunction, select.value);
      }
    }
  },
  unmounted() {
    this.isOpen = false;
  }
});
</script>

<style>
.select-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.custom-select {
  margin-top: 1em;
  background-color: transparent;
  font-size: 16px;
  width: 100%;
  border-color: lightgray;
  padding: 7px 9px;
  border-radius: 5px;
  appearance: none;
}

.dropdown-icon {
  font-size: 20px;
  pointer-events: none;
  position: absolute;
  margin-right: 20px;
  margin-top: 15px;
  transition: 0.44s;
}

.is-opened {
  transform: rotate(180deg);
  transition: 0.44s;
}
</style>