<script lang="ts" setup>
import WHeader from "./components/w_header/index.vue";
import WMain from "./components/w_main/index.vue";
import WFooter from "./components/w_footer/index.vue";
import WRightMenuList from "@/components/WRightMenuList.vue";
import { Application } from "@splinetool/runtime";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useLoadingStore } from "@/store/loading";

const router = useRouter();

const loadingStore = useLoadingStore();

const watchScroll = () => {};

const getCanvas = () => {
  const canvas = document.getElementById("canvas3d");
  if (
    canvas !== null &&
    canvas instanceof HTMLCanvasElement &&
    window.innerWidth >= 768
  ) {
    const spline = new Application(canvas);
    spline.load("https://prod.spline.design/QtjyKwneLbc7H6gb/scene.splinecode");
  }
};

onMounted(() => {
  window.addEventListener("scroll", watchScroll);
  getCanvas();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", watchScroll);
});
</script>

<template>
  <div class="mainControl">
    <div class="canvas-box">
      <canvas v-if="!loadingStore.loading" id="canvas3d"></canvas>
    </div>
    <div
      :class="[
        'common-layout',
        { isHome: router.currentRoute.value.path === '/home' },
      ]"
    >
      <el-container>
        <el-header>
          <WHeader></WHeader>
        </el-header>
        <el-main>
          <WMain></WMain>
        </el-main>
        <el-footer v-if="router.currentRoute.value.path === '/home'">
          <WFooter></WFooter>
        </el-footer>
      </el-container>
    </div>
    <WRightMenuList></WRightMenuList>
  </div>
</template>

<style lang="scss" scoped>
.mainControl {
  position: relative;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .canvas-box {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
}
.isHome {
  max-width: 1140px;
}
.common-layout {
  z-index: 5;
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
