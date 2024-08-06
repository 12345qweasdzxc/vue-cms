<template>
  <div class="app-main">
    <router-view v-slot="{ Component }" class="wrapper">
      <transition name="fade-transform">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.app-main {
  min-width: 980px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .wrapper {
    position: relative;
    margin: 105px 20px 0px;
    box-sizing: border-box;
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
