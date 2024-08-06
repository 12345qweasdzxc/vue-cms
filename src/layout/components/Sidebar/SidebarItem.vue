<template>
  <el-menu-item v-if="!route.children.length" :index="route.path">
    <svg-icon :icon="route.icon" class="el-icon"></svg-icon>
    <span>{{ route.title }}</span>
  </el-menu-item>
  <el-sub-menu v-else :index="route.path">
    <template #title>
      <svg-icon :icon="route.icon" class="el-icon"></svg-icon>
      <span>{{ route.title }}</span>
    </template>

    <el-menu-item
      v-for="child in route.children"
      :key="child.path"
      :index="child.path"
    >
      <svg-icon :icon="child.icon" class="el-icon"></svg-icon>
      <span>{{ child.title }}</span>
    </el-menu-item>
  </el-sub-menu>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  route: {
    //数组项
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
span {
  margin-left: 10px;
}
</style>
