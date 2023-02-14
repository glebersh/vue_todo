<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppHeader'
});
</script>

<style scoped>
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
</style>