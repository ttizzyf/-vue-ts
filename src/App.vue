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

const submit = () => {
  if (!selectNum.value) return proxy.$tips.error("请选择要添加的章节");
  const list = state.uploadList.filter((key) =>
    state.realSelectedKeys.includes(key.key)
  ); // console.log(list, 'list');
  console.log("state.chapterOk", state.chapterOk);
  const prepareList = list.map((item) => ({
    chapterTitle: item.chapterTitle.split("-")[1],
    content: item.content.toString(),
  }));
  let tenItemList: any = [];
  prepareList.map((item, index) => {
    tenItemList.push(item);
    if (tenItemList.length == 10) {
      state.tenList.push(tenItemList);
      tenItemList = [];
    } else if (prepareList.length - 1 == index) {
      state.tenList.push(tenItemList);
    }
  });
};

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
