<template>
  <div class="article-detail">
    <el-dialog v-model="isShow">
      <template #header> <h4>文章详情</h4> </template>
      <div class="content">
        <el-scrollbar height="400px">
          <p v-html="content"></p>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps } from "vue";
const isShow = ref(false);
const props = defineProps(["content"]);
const open = () => {
  isShow.value = true;
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/scss/vue.scss";
</style>
