<template>
  <div class="hamburger-container" @click="changeSidebarOpened">
    <svg-icon :icon="icon" class="hamburger" id="guide-hamburger"></svg-icon>
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app";
import { computed } from "vue-demi";

const appStore = useAppStore();

const icon = computed(() =>
  appStore.sidebarOpened ? "hamburger-opened" : "hamburger-closed"
);

const changeSidebarOpened = () => {
  appStore.changeSidebarOpened();
};
</script>
<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
