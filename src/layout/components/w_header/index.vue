<script lang="ts" setup>
import "@/styles/index.scss";
import { ref, computed } from "vue";
import ChangeColor from "libs/changeTheme.ts";
// import W3dCardVue from "@/components/W3dAvatar.vue";
import WMenuList from "@/components/WMenuList.vue";
import { useRouter } from "vue-router";
import { isMobile } from "store/isMobile.ts";
import WRightMenuList from "@/components/WRightMenuList.vue";
const router = useRouter();
const mobileWidth = isMobile();
// blog版号
const version = ref(import.meta.env.VITE_APP_WEB_VERSION);
// blog名称
const BlogName = ref(import.meta.env.VITE_APP_WEB_TITLE);

// 是否启用简约屏
const isHomePage = computed(() => {
  if (router.currentRoute.value.name !== "home") {
    return true;
  } else {
    return false;
  }
});

// 右侧菜单DOM
const rightMenuDOM = ref();
// 展示左侧菜单
const showMenu = () => {
  rightMenuDOM.value.changeDrawer();
};
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
    <!-- 博客名称 -->
    <div v-if="!isHomePage" class="BlogName mb20 caps">{{ BlogName }}</div>
    <!-- 博客介筛 -->

    <!-- 博客菜单栏 -->
    <div class="tabsColumn">
      <i class="iconfont icon menuIcon" @click="showMenu">&#xe612;</i>
      <div
        v-show="mobileWidth.isMobileTerminal || isHomePage"
        class="ChangeColor ml20 pointer colorBox"
        @click="ChangeColor"
      >
        <i class="iconfont icon">&#xe611;</i>
      </div>
      <div class="tabsLine"></div>
      <el-scrollbar>
        <WMenuList></WMenuList>
      </el-scrollbar>
    </div>
  </div>
  <!-- 右侧菜单 -->
  <WRightMenuList ref="rightMenuDOM"></WRightMenuList>
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
// 博客名称
.BlogName {
  font-size: 5vw;
  color: $seconed;
  letter-spacing: 2em;
  @include link-colors($main, $seconed, $primary);
  @media screen and (max-width: 768px) {
    display: none;
  }
}
// tabs栏
.tabsColumn {
  margin-top: 40px;
  position: relative;
  .menuIcon {
    position: absolute;
    top: -28px;
    left: 10px;
    color: #000;
    z-index: 10;
  }
  .colorBox {
    position: absolute;
    right: 0;
    top: -35px;
  }
  .tabsLine {
    position: relative;
    border-top: 2px solid #ffffff;
    &::before {
      content: "";
      display: block;
      width: 96px;
      height: 32px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-image: linear-gradient(44deg, #ffffff 64px, transparent 64px);
    }
    &::after {
      content: "";
      display: block;
      width: 128px;
      height: 32px;
      position: absolute;
      right: 0;
      top: 0;
      background-image: linear-gradient(45deg, transparent 32px, #ffffff 32px);
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  .menuListBox {
    line-height: 1;
    overflow: auto;
    // overflow: hidden;
  }
}
</style>
