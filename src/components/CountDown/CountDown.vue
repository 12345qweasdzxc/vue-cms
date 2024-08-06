<template>
  <div class="count-wrapper">
    <slot class="icon"></slot>
    <h2>{{ msg }}</h2>
    <div class="count-txt">
      页面将在 {{ time }} 秒后跳转至 <span>{{ targetRoute.title }}</span>
    </div>
    <div class="return" @click="immediateReturn">立即跳转</div>
  </div>
</template>
<script setup>
import { computed, defineProps, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  isLogin: {
    type: Boolean,
    required: true,
  },
});
const time = ref(5);
let timer = null;

const countFn = (time) => {
  if (time.value > 0) {
    timer = setTimeout(() => {
      time.value--;
      console.log("hello");
      countFn(time);
    }, 1000); //一秒使得time-1
  } else {
    // 跳转到 目标路由
    router.push(targetRoute.value.path);
  }
};

countFn(time);

const targetRoute = computed(() => {
  return props.isLogin
    ? { path: "/", title: "首页" }
    : { path: "/login", title: "登录页面" };
});

const immediateReturn = () => {
  clearTimeout(timer);
  router.push(targetRoute.value.path);
};
</script>
<style lang="scss" scoped>
.count-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
  text-align: center;
  :deep(.el-icon) {
    font-size: 150px;
  }
  h2 {
    margin-top: 20px;
    font-size: 26px;
  }
  .count-txt {
    margin-top: 20px;
    span {
      color: #000;
    }
  }
  .return {
    width: 100px;
    height: 40px;
    background-color: #304156;
    border-radius: 20px;
    margin: 20px auto;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
  }
}
</style>
