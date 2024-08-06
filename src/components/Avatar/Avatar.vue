<template>
  <el-dropdown trigger="click">
    <el-avatar :size="40" :src="avatarSrc" shape="square"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          ><router-link to="/">首页</router-link></el-dropdown-item
        >
        <el-dropdown-item divided @click="handleLogout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { getAvatar } from "@/hooks/getAvatar";
import { useUserStore } from "@/store/user";

const { avatarSrc } = getAvatar();
const userStore = useUserStore();
const handleLogout = () => {
  userStore.logoutFn();
};
</script>
<style lang="scss" scoped></style>
