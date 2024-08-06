<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      v-for="(item, index) in tagsViewList"
      :key="item.path"
      :to="item.path"
      :class="{ active: item.path === route.path }"
      @contextmenu.prevent="openContextMenu($event, index)"
    >
      {{ item.title }}
      <el-icon
        class="el-icon-close"
        @click.stop.prevent="closeTag(index)"
        v-show="item.path !== route.path"
      >
        <Close />
      </el-icon>
    </router-link>
    <ContextMenu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></ContextMenu>
  </div>
</template>
<script setup>
import { useAppStore } from "@/store/app";
import { computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { Close } from "@element-plus/icons-vue";
import ContextMenu from "./components/ContextMenu.vue";

const appStore = useAppStore();
const route = useRoute();
const tagsViewList = computed(() => appStore.tagsViewList);
const visible = ref(false);
const menuStyle = ref({});
const selectIndex = ref(0);

const openContextMenu = (event, index) => {
  const { x, y } = event;
  visible.value = true;
  selectIndex.value = index;
  menuStyle.value = {
    top: y + "px",
    left: x + "px",
  };
};
const closeContextMenu = () => {
  visible.value = false;
};
const closeTag = (index) => {
  appStore.removeTagViewList("me", index);
};
watch(
  route,
  () => {
    const tag = route.matched[route.matched.length - 1];
    appStore.addTagViewList({
      path: tag.path,
      title: tag.meta.title,
    });
  },
  {
    immediate: true,
  }
);

watch(visible, () => {
  if (visible.value) {
    document.addEventListener("click", closeContextMenu);
  } else {
    document.removeEventListener("click", closeContextMenu);
  }
});
</script>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      background-color: $menuBg;
      border-color: $menuBg;
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      vertical-align: -1px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
