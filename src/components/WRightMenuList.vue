<script setup lang="ts">
import { ref, onMounted, Ref, watch } from "vue";
// import { useRouter } from "vue-router";
import "@/styles/index.scss";
import { isMobile } from "store/isMobile.ts";
// import { useLoginingInfoStore } from "store/userInfo.ts";
import WSideMenu from "./WSideMenu.vue";
import WLoginAndRegisiter from "./WLoginAndRegisiter.vue";
import WUserInfoForm from "./WUserInfoForm.vue";
import { useUserStore } from "../store/user.ts";
import WUploadAvatar from "./WUploadAvatar.vue";
const userStore = useUserStore();
const mobile = isMobile();
// 抽屉控件
const isShowDrawer = ref(false);
// 打开抽屉
const changeDrawer = () => {
  isShowDrawer.value = true;
};
// 根据是否登录展示不同菜单
const tabsItems: Ref = ref([
  { name: "menu", id: "menu" },
  { name: "user", id: "userInfo" },
  { name: "login", id: "loginAndRegisiter" },
]);

// 展示菜单
const activeIndex = ref(0);

// 选择菜单
const activeMenuItem = (index: number) => {
  activeIndex.value = index;
};

// 展示菜单内容
watch(
  () => userStore.LoginInfo,
  () => {
    if (userStore.LoginInfo) {
      tabsItems.value = [
        { name: "menu", id: "menu" },
        { name: "user", id: "userInfo" },
      ];
    } else {
      tabsItems.value = [
        { name: "menu", id: "menu" },
        { name: "login", id: "loginAndRegisiter" },
      ];
    }
  },
  { immediate: true, deep: true }
);

// 向外暴露是否打开抽屉
defineExpose({
  changeDrawer,
});

onMounted(() => {});
</script>

<template>
  <div>
    <el-drawer
      :size="mobile.isMobileTerminal ? 270 : 400"
      v-model="isShowDrawer"
      direction="ltr"
      :show-close="false"
      class="drawer"
    >
      <template #header="{}">
        <div class="headerInfo">
          <WUploadAvatar></WUploadAvatar>
          <div class="nickName ml10 fz20 pointer">
            {{
              userStore.LoginInfo?.nickname
                ? userStore.LoginInfo.nickname
                : "未登录"
            }}
          </div>
        </div>
      </template>
      <div class="tabsLine"></div>
      <div class="menu">
        <div
          class="menu-item caps"
          v-for="(item, index) in tabsItems"
          :class="{ active: activeIndex === index }"
          :key="item.id"
          @click="activeMenuItem(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div v-if="activeIndex === 0" class="w-side-menu mt20">
        <WSideMenu></WSideMenu>
      </div>
      <div v-if="activeIndex === 1 && !userStore.LoginInfo">
        <WLoginAndRegisiter></WLoginAndRegisiter>
      </div>
      <div v-if="activeIndex === 1 && userStore.LoginInfo">
        <WUserInfoForm></WUserInfoForm>
      </div>
      <div class="flex stripe-box">
        <div>
          <i class="setup-icon iconfont fz24 mr10">&#xe609;</i>
        </div>
        <div class="stripe"></div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.drawer {
  position: relative;
  .stripe-box {
    position: absolute;
    bottom: 20px;
    width: calc(100% - 40px);
    .setup-icon {
      color: #ffffff;
      font-size: 36px;
    }
    .stripe {
      width: 100%;
      background: url("../../public/stripe.svg") repeat 0 0;
      background-size: 16px;
      padding: 16px;
    }
  }
}
.headerInfo {
  display: flex;
  justify-content: start;
  align-items: center;
  .nickName {
    color: $seconed;
    :deep(.el-input__wrapper) {
      background-color: $main;
    }
    :deep(.el-input__inner) {
      color: $seconed;
    }
    :deep(.el-input__wrapper.is-focus) {
      box-shadow: 0 0 0 1px $seconed;
    }
  }
}
:deep(.el-drawer) {
  background-color: $main;
  box-shadow: 6px 6px 6px rgba(#ffffff, 0.12);
}
:deep(.el-drawer__header) {
  margin-bottom: 0;
}
:deep(.el-drawer__body) {
  overflow: visible;
}
.tabsLine {
  position: relative;
  border-top: 2px solid $primary;
  &::after {
    content: "";
    display: block;
    width: 128px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
    background-image: linear-gradient(45deg, transparent 32px, $primary 32px);
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
.menu {
  display: flex;
  width: 100%;
  justify-content: start;
  .menu-item {
    position: relative;
    color: #ffffff;
    padding: 0 10px;
    cursor: pointer;
    line-height: 32px;
    background-color: transparent;
    color: $seconed;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    font-size: 12px;
    // letter-spacing: 0.09em;
    transition: all 0.3s linear;
    &:hover {
      color: $primary;
    }
  }
  .active {
    color: $primary;
    border-radius: 3px;
    border-bottom: 3px solid $primary;
    font-weight: 700;
    transition: left 0.2s ease-in, width 0.2s ease-in;
  }
}
</style>
