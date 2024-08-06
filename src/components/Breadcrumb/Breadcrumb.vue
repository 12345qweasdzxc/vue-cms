<template>
  <el-breadcrumb separator="/" class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <router-link
          :to="item.path"
          v-if="index !== breadcrumbData.length - 1"
          class="redirect"
          >{{ item.meta.title }}</router-link
        >
        <!-- 只有最后一项是span  -->
        <span v-else class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { computed } from "vue-demi";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbData = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title);
});
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
