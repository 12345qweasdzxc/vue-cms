<template>
  <div class="app-wrapper" :class="open">
    <!-- 左侧菜单  -->
    <Sidebar class="sidebar-container" id="guide-menu"></Sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <Navbar></Navbar>
        <TagsView id="guide-tags"></TagsView>
      </div>
      <!-- 主要内容区 也是二级路由展示的位置  -->
      <AppMain></AppMain>
    </div>
  </div>
</template>
<script setup>
import Sidebar from "./components/Sidebar/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import TagsView from "@/components/TagsView/TagsView.vue";
import AppMain from "./components/AppMain.vue";
import { useAppStore } from "@/store/app";
import { computed } from "vue";
const appStore = useAppStore();

const open = computed(() =>
  appStore.sidebarOpened ? "openSidebar" : "hideSidebar"
);
</script>
<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
    background-color: #f0f2f5;

    transition: margin-left, $sideBarDuration !important;
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      // 减去 侧边导航栏的宽度
      width: calc(100% - #{$sideBarWidth});
      transition: width #{$sideBarDuration};
    }
  }
  .sidebar-container {
    overflow: hidden;
    position: fixed;
    z-index: 1001;
    width: $sideBarWidth;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: $menuBg;
    transition: width #{$sideBarDuration};
  }
}

.openSidebar {
  // 展开时
  .sidebar-container {
    width: $sideBarWidth !important;
  }
}

.hideSidebar {
  // 折叠时
  .sidebar-container {
    width: $hideSideBarWidth !important;
  }
  .main-container {
    margin-left: $hideSideBarWidth !important;
  }
  .fixed-header {
    width: calc(100% - $hideSideBarWidth) !important;
  }
}
</style>
