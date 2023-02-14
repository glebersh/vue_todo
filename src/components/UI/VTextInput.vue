<template>
  <input class="custom-input" type="text" :style="{ borderColor: colorScheme }" :value="modelValue"
    :placeholder="placeholder" @input="handleInput" @keyup.enter="$emit('onEnter')" />
</template>

<script lang="ts">
import { colorSchemeMixin, fontSizeMixin } from "@/mixins/index";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VTextInput",
  mixins: [colorSchemeMixin, fontSizeMixin],
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String,
    }
  },
  methods: {
    handleInput(event: Event) {
      const inputElement = event?.currentTarget as HTMLInputElement;
      this.$emit('update:modelValue', inputElement.value);
    }
  }
});
</script>

<style>
.custom-input {
  border: 1px solid;
  border-radius: 3px;
  background-color: transparent;
  padding: 5px 25px 5px 10px;
}
</style>
