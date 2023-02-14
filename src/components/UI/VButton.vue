<template>
  <button class="custom-button" :style="{ borderColor: colorScheme, fontSize: fontSize }">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { colorSchemeMixin, fontSizeMixin } from '@/mixins/index';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VButton',
  mixins: [colorSchemeMixin, fontSizeMixin]
});
</script>

<style>
.custom-button {
  border: 1px solid;
  border-radius: 3px;
  padding: 5px 15px;
  background-color: transparent;
  transition: 0.33s ease-in-out;
}

.custom-button:hover {
  background-color: rgba(211, 211, 211, 0.25);
  cursor: pointer;
}

.custom-button:active {
  transform: scale(0.95, 0.95);
}
</style>