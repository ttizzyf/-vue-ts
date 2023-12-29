<script setup lang="ts">
import { computed } from "vue";
import { useLoadingStore } from "../store/loading";

const loadingStore = useLoadingStore();
const loadingState = computed(() => {
  return loadingStore.loading;
});
</script>

<template>
  <div v-show="loadingState" id="loading">
    <div class="loader">
      <div class="loader-inner square-spin">
        <div class="box"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loaders {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
}
.loader {
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 20%;
  max-width: 20%;
  height: 140px;
  align-items: center;
  justify-content: center;
}
@keyframes square-spin {
  25% {
    -webkit-transform: perspective(100px) rotateX(180deg) rotateY(0);
    transform: perspective(100px) rotateX(180deg) rotateY(0);
  }

  50% {
    -webkit-transform: perspective(100px) rotateX(180deg) rotateY(180deg);
    transform: perspective(100px) rotateX(180deg) rotateY(180deg);
  }

  75% {
    -webkit-transform: perspective(100px) rotateX(0) rotateY(180deg);
    transform: perspective(100px) rotateX(0) rotateY(180deg);
  }

  100% {
    -webkit-transform: perspective(100px) rotateX(0) rotateY(0);
    transform: perspective(100px) rotateX(0) rotateY(0);
  }
}

.square-spin > .box {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  width: 80px;
  height: 80px;
  background: $seconed;
  position: relative;
  box-shadow: 0 0 20px rgba($seconed, 0.8); // 可以调整阴影的大小和透明度
  -webkit-animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9)
    infinite;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
#loading {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
