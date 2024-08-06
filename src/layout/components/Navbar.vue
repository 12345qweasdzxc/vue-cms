<template>
  <div class="navbar">
    <!-- 汉堡包  -->
    <Hamburger></Hamburger>
    <!-- 面包屑  -->
    <Breadcrumb id="guide-breadcrumb"></Breadcrumb>

    <div class="right-menu">
      <HeaderSearch class="right-menu-item hover-effect"></HeaderSearch>
      <!-- 功能导航  -->

      <Guide class="right-menu-item hover-effect"></Guide>
      <!-- 全屏  -->
      <FullScreen class="right-menu-item hover-effect"></FullScreen>

      <!-- 头像组件  -->
      <Avatar class="right-menu-item hover-effect"></Avatar>
    </div>
  </div>
</template>
<script setup>
import Hamburger from "@/components/Hamburger/Hamburger.vue";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.vue";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch.vue";
import FullScreen from "@/components/FullScreen/FullScreen.vue";
import Guide from "@/components/Guide/Guide.vue";
import Avatar from "@/components/Avatar/Avatar.vue";
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // 汉堡包压缩
  .hamburger-container {
    float: left;
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  // 面包屑
  .breadcrumb-container {
    float: left;
  }
  // 右侧菜单
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    height: 50px;
    .right-menu-item {
      display: inline-block;
      // padding: 0 18px 0 0;
      margin-right: 18px;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
