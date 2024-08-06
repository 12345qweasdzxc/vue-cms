<template>
  <div class="">
    <div class="logo-container">
      <el-avatar shape="square" :size="40" :src="avatarSrc" />
      <h1 class="logo-title" v-show="appStore.sidebarOpened">vue3-cms</h1>
    </div>
    <el-menu
      :default-active="activeRoute"
      :collapse="!appStore.sidebarOpened"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#fff"
      router
      :unique-opened="true"
    >
      <SidebarItem
        v-for="item in menuRoute"
        :route="item"
        :key="item.path"
      ></SidebarItem>
    </el-menu>

  </div>
</template>
<script setup>
import { useRouteStore } from "@/store/route";
import { computed } from "vue";
import SidebarItem from "./SidebarItem";
import { useRoute } from "vue-router";
import { getAvatar } from "@/hooks/getAvatar";
import { useAppStore } from "@/store/app";

const routeStore = useRouteStore();
const route = useRoute();

const appStore = useAppStore();

const menuRoute = computed(() => routeStore.menuRoute);

const activeRoute = computed(() => route.path);

const { avatarSrc } = getAvatar();
</script>
<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + "px";
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: 0 !important;
}
</style>
