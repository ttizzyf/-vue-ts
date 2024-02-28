<script lang="ts" setup>
import WMenuList from "@/components/WMenuList.vue";
import { ref } from "vue";

const menulist = ref();

const goHome = () => {
  menulist.value.activateMenuItem(0, {
    name: "HOME",
    id: "home",
    path: "/home",
  });
};
</script>

<template>
  <div class="header-box">
    <img class="image pointer" @click="goHome" src="../assets/imgs/head.png" />
    <el-scrollbar>
      <WMenuList ref="menulist"></WMenuList>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
</style>
