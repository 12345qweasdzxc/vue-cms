<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRight">关闭右侧</li>
    <li @click="onCloseOther">关闭其他</li>
  </ul>
</template>
<script setup>
import { computed, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const props = defineProps({
  index: {
    type: Number,
    require: true,
  },
});
const tagsViewList = computed(() => appStore.tagsViewList);
const onRefreshClick = () => {
  router.go(0);
};

const onCloseRight = () => {
  const activeIndex = tagsViewList.value.findIndex(
    (item) => item.path === route.path
  );
  if (activeIndex > props.index) {
    router.push(tagsViewList.value[props.index].path);
  }

  appStore.removeTagViewList("right", props.index);
};

const onCloseOther = () => {
  appStore.removeTagViewList("other", props.index);

  router.push(tagsViewList.value[0].path);
};
</script>
<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
