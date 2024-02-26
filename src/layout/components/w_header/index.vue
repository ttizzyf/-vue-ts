<script lang="ts" setup>
import "@/styles/index.scss";
import { ref, computed } from "vue";
import ChangeColor from "libs/changeTheme.ts";
// import W3dCardVue from "@/components/W3dAvatar.vue";
import { useRouter } from "vue-router";
import { isMobile } from "store/isMobile.ts";
const router = useRouter();
const mobileWidth = isMobile();
// blog版号
const version = ref(import.meta.env.VITE_APP_WEB_VERSION);

// 是否启用简约屏
const isHomePage = computed(() => {
  if (router.currentRoute.value.name !== "home") {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <div class="headerBox">
    <!-- 头部 -->
    <div v-if="!isHomePage" class="headerControl flex mt20 mb20">
      <div class="headerRight mr30"></div>
      <div class="version pl20 pr20 ml30 caps fz12">{{ version }}</div>
      <div
        v-if="!mobileWidth.isMobileTerminal || !isHomePage"
        class="ChangeColor ml20 pointer"
        @click="ChangeColor"
      >
        <i class="iconfont icon">&#xe611;</i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 头部
.headerControl {
  @media screen and (max-width: 768px) {
    display: none;
  }
  position: relative;
  height: 30px;
  .headerRight {
    position: relative;
    height: 32px;
    width: 100%;
    background-color: #ffffff;
    &::after {
      position: absolute;
      right: -16px;
      content: "";
      background-image: linear-gradient(63.43deg, #ffffff 50%, transparent 50%);
      height: 32px;
      width: 16px;
    }
  }
  .version {
    position: relative;
    height: 32px;
    line-height: 32px;
    background-color: #ffffff;
    color: #000000;
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -16px;
      content: "";
      display: block;
      background-image: linear-gradient(
        243.43deg,
        #ffffff 50%,
        transparent 50%
      );
      height: 32px;
      width: 16px;
    }
  }
}

.ChangeColor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  color: $primary;
  .icon {
    font-size: 24px;
  }
}
</style>
