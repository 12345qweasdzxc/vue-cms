<template>
  <div>
    <svg-icon :icon="icon" @click="onToggle" id="guide-fullscreen"></svg-icon>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import screenfull from "screenfull";

const isFullScreen = ref(false);

const icon = computed(() =>
  isFullScreen.value ? "exit-fullscreen" : "fullscreen"
);

const onToggle = () => {
  screenfull.toggle();
};

const change = () => {
  isFullScreen.value = !isFullScreen.value;
};

onMounted(() => {
  screenfull.on("change", change);
});

onUnmounted(() => {
  screenfull.off("change", change);
});
</script>
<style lang="scss" scoped></style>
