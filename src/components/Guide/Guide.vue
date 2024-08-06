<template>
  <div class="">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="功能引导"
      placement="bottom"
    >
      <div>
        <svg-icon icon="guide" @click="startGuide" id="guide-start"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>
<script setup>
import Driver from "driver.js";
import { onMounted } from "vue";
import steps from "./steps";
import "driver.js/dist/driver.min.css";

let driver = null;
const startGuide = () => {
  driver.start();
};
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: "关闭",
    nextBtnText: "下一个",
    prevBtnText: "上一个",
    animate: false,
    onHighlighted(element) {
      console.log(element);
      const node = element.node;
      const divHighLight = document.querySelector(
        "#driver-highlighted-element-stage"
      );

      if (node.id === "guide-menu") {
        divHighLight.classList.add("change");
      } else {
        divHighLight.classList.remove("change");
      }
    },
  });
  driver.defineSteps(steps);
});
</script>
<style lang="scss" scoped>
:global(.change) {
  height: auto !important;
  top: 0 !important;
  bottom: 0 !important;
}
</style>
