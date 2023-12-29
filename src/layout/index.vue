<script lang="ts" setup>
import WHeader from "./components/w_header/index.vue";
import WMain from "./components/w_main/index.vue";
import WFooter from "./components/w_footer/index.vue";
import { onMounted, onBeforeUnmount } from "vue";

// const showHeader = ref(true);

// const state = reactive({
//   lastScrollTop: 0,
//   show: {
//     menuList: true,
//   },
// });
// 头部元素DOM获取
// const wHeaderBox = ref();

const watchScroll = () => {};

onMounted(() => {
  window.addEventListener("scroll", watchScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", watchScroll);
});
</script>

<template>
  <div class="mainControl">
    <div class="common-layout">
      <el-container>
        <el-header>
          <WHeader></WHeader>
        </el-header>
        <el-main>
          <WMain></WMain>
        </el-main>
        <el-footer>
          <WFooter></WFooter>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainControl {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1800px;
}
.common-layout {
  background-color: $main;
  max-width: 1140px;
  width: 100%;
  transition: all 0.4s linear;
  .el-header {
    height: auto;
    padding: 0px;
  }
  .el-main {
    height: auto;
    padding: 0px;
    overflow: unset;
  }
}
</style>
