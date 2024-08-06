<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="rules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="typeInput"
        />
        <span class="show-pwd" @click="changeShowEye">
          <svg-icon :icon="eyeIcon"></svg-icon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="handleSubmit"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { validatePassword } from "./validatePassword";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

// 控制密码框显示状态
const isShowEye = ref(false);
const loginForm = ref({
  username: "无",
  password: "zq123456",
});
const loginFormRef = ref(null);
const rules = ref({
  username: [{ required: true, message: "用户名是必填项", trigger: "blur" }],
  password: [
    { required: true, message: "密码是必填项", trigger: "blur" },
    {
      // 自定义校验规则
      validator: validatePassword,
      trigger: "blur",
    },
  ],
});

const eyeIcon = computed(() => (isShowEye.value ? "eye-open" : "eye"));
const typeInput = computed(() => (isShowEye.value ? "text" : "password"));

const changeShowEye = () => {
  isShowEye.value = !isShowEye.value;
};

const handleSubmit = () => {
  // 确保校验都成了 才能往下走
  loginFormRef.value.validate((vaild) => {
    if (vaild) {
      // 校验完整
      userStore.loginFn(loginForm.value);
    } else {
      ElMessage({
        message: "填写不规范",
        type: "warning",
        grouping: true,
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $menuBg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      // 修改element样式
      display: inline-block;
      height: 47px;
      width: 85%;
      div {
        width: 100%;
        background: transparent;
        border: 0;
        box-shadow: 0 0 0 0;
        input {
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
