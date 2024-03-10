<script setup lang="ts">
import Wloading from "./components/Wloading.vue";
import { onMounted } from "vue";
import { useLoadingStore } from "store/loading.ts";
import lazyLoadImages from "@/libs/lazyImage.ts";
import "./assets/font/index.scss";
import { useUserStore } from "./store/user";
import { useMenusStore } from "./store/menu";
import { getWebSetting } from "./api/common.ts";
import setting from "./setting";

// 获取网站信息
const getWebSettingAPI = async () => {
  const res = await getWebSetting();
  menuStore.webSetting = res.data.data;
  let themeList = menuStore.webSetting.theme.map((item) => {
    return setting.generateThemeColor(item.main, item.seconed, item.primary);
  });
  setting.theme.list = themeList;
  console.log(menuStore.webSetting);
};

let store = useLoadingStore();
// @ts-ignore
let userStore = useUserStore();
let menuStore = useMenusStore();
onMounted(() => {
  lazyLoadImages();
  getWebSettingAPI();
});
</script>

<template>
  <Wloading v-if="store.loading"></Wloading>
  <RouterView v-else />
</template>

<style lang="scss">
body {
  background-color: $main;
  font-family: zcool-gdh_Regular;
}
</style>
