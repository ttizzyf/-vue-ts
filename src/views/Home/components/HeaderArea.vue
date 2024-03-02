<script lang="ts" setup>
import { ref, computed } from "vue";
import WMenuList from "@/components/WMenuList.vue";
import { useRouter } from "vue-router";
import { isMobile } from "store/isMobile.ts";
import { useMenusStore } from "@/store/menu.ts";
import ChangeColor from "libs/changeTheme.ts";

const menusStore = useMenusStore();
const router = useRouter();
const mobileWidth = isMobile();
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
</script>

<template>
  <div class="mb20">
    <!-- 博客名称 -->
    <div v-if="!isHomePage" class="BlogName mb20 caps">{{ BlogName }}</div>
    <!-- 博客菜单栏 -->
    <div class="tabsColumn">
      <i class="iconfont icon menuIcon pointer" @click="menusStore.changeDrawer"
        >&#xe612;</i
      >
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
</template>

<style lang="scss" scoped>
// 博客名称
.BlogName {
  font-size: 5vw;
  color: $seconed;
  letter-spacing: 2em;
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
