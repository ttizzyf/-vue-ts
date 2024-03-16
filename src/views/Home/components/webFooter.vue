<script lang="ts" setup>
import { useMenusStore } from "@/store/menu";
const menusStore = useMenusStore();

const link = (url: string) => {
  window.open(url, "_blank");
};
</script>

<template>
  <div class="footer-box">
    <div class="copyright">
      Copyright ©2024 by
      <span class="pointer" @click="link('https://gitee.com/yequcailingzhi')"
        >@ {{ menusStore.webSetting.footerFiling.auther || "MaiXF" }}</span
      >
      . All rights reserved. |
      <span
        class="pointer"
        @click="link('https://beian.miit.gov.cn/#/Integrated/index')"
        >{{ menusStore.webSetting.footerFiling.number }}</span
      >
      |
      <span class="pointer" @click="link('http://www.maixf.top:4089/manage')"
        >主页管理页面👈</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-box {
  border-top: 1px solid #ffffff;
  padding: 1.5rem;
  .copyright {
    text-align: center;
    font-size: 0.8rem;
    color: #a8a8a8;
    letter-spacing: 1px;
  }
}
</style>
