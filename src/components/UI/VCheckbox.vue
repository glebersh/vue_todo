<template>
  <div class="custom-checkbox" :checked="isChecked">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check checkbox-icon"
      :class="isChecked ? 'is-checked' : 'not-checked'" viewBox="0 0 16 16">
      <path
        d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VCheckbox',
  props: {
    isChecked: { type: Boolean }
  },
});
</script>

<style>
.custom-checkbox {
  width: 14px;
  height: 14px;
  border: 2px solid lightgray;
  border-radius: 15%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  transition: 0.33s ease-in-out;
}

.custom-checkbox:hover {
  border-color: rgb(65, 65, 65);
  cursor: pointer;
}

.custom-checkbox:active {
  transform: scale(0.95, 0.95);
}

.checkbox-icon {
  color: rgb(65, 65, 65);
}

.not-checked {
  opacity: 0;
}

.is-checked {
  opacity: 1;
}
</style>