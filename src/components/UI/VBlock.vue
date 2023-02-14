<template>
  <div :class="'custom-card ' + `${size} ` + `flex-${flex}`" :style="{ borderColor: colorScheme }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { colorSchemeMixin } from '@/mixins';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VBlock',
  mixins: [colorSchemeMixin],
  props: {
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    flex: {
      type: String,
      required: false,
      default: '',
    }
  },
});
</script>

<style>
.custom-card {
  display: inline-block;
  border: 1px solid;
  border-radius: 10px;
  width: fit-content;
}

.sm {
  padding: 5px;
}

.md {
  padding: 12px;
}

.lg {
  padding: 24px;
}

.flex-row {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
}

.flex-col {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}
</style>