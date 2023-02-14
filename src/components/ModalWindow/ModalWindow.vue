<template>
  <div class="modal-window" ref="modalWindow" @click.stop="$emit('update:isModalWindowVisible', false)"
    v-if="isModalWindowVisible">
    <div class="modal-window-content" @click.stop>
      <SettingsList :currentList="currentList" @toggleModalWindow="$emit('update:isModalWindowVisible', false)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsList from '../SettingsList/SettingsList.vue';
export default defineComponent({
  name: "ModalWindow",
  props: {
    isModalWindowVisible: { type: Boolean },
    currentList: { type: String },
  },
  components: { SettingsList }
});
</script>

<style>
.modal-window {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0F0F0F30;
}

.modal-window:hover {
  cursor: pointer;
}

.modal-window-content {
  border: 1px solid #B0B0B070;
  position: absolute;
  top: 30%;
  left: 40%;
  padding: 30px;
  width: 300px;
  height: 300px;

  background-color: white;
  border-radius: 15px;
  cursor: default;
}
</style>