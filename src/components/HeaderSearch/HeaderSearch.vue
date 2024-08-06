<template>
  <div class="header-search">
    <svg-icon
      icon="search"
      class="search-icon"
      @click.stop="onShowClick"
      id="guide-search"
    ></svg-icon>
    <el-select
      v-model="searchValue"
      filterable
      placeholder="搜索"
      class="header-search-select"
      :class="{ show: isShow }"
      remote
      :remote-method="querySearch"
      @change="chooseOption"
    >
      <el-option
        v-for="item in searchOption"
        :value="item.item"
        :key="item.item.path"
        :label="item.item.titles.join(' > ')"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import getRoutePool from "@/assets/js/handleData";
import Fuse from "fuse.js";
import { useRouter } from "vue-router";
const router = useRouter();

const searchValue = ref({});
const isShow = ref(false);
const searchOption = ref([]);

const onShowClick = () => {
  isShow.value = !isShow.value;
};

const querySearch = (query) => {
  //query 用户输入的value  返回帅选好的数组
  searchOption.value = fuse.search(query);
  console.log(searchOption.value);
};

const pool = getRoutePool();

// 初始化 fuse
// 搜索池 传进去
const fuse = new Fuse(pool, {
  // 是否按优先级排序
  shouldSort: true,

  // 分配权重
  keys: [
    { name: "title", weight: 0.7 },
    { name: "path", weight: 0.3 },
  ],
});
const onClose = () => {
  isShow.value = false;
  searchOption.value = [];
  searchValue.value = null;
};
const chooseOption = (val) => {
  onClose();
  router.push(val.path);
};

watch(isShow, () => {
  if (isShow.value) {
    document.addEventListener("click", onClose);
  } else {
    document.removeEventListener("click", onClose);
  }
});
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    &.show {
      width: 210px;
      margin-left: 10px;
    }

    :deep(.el-input__wrapper) {
      box-shadow: none !important;

      .el-input__inner {
        border-bottom: 1px solid #d9d9d9;
      }
    }
  }
}
</style>
