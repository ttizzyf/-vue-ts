<script setup lang="ts">
import Wloading from "./components/Wloading.vue";
import { onMounted } from "vue";
import { useLoadingStore } from "store/loading.ts";
import lazyLoadImages from "@/libs/lazyImage.ts";
import "./assets/font/index.scss";
import { useUserStore } from "./store/user";

let store = useLoadingStore();
// @ts-ignore
let userStore = useUserStore();
onMounted(() => {
  lazyLoadImages();
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
