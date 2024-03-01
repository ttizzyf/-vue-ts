<script lang="ts" setup>
import Wheader from "@/components/Wheader.vue";
import WSectionHeader from "@/components/WSectionHeader.vue";
</script>

<template>
  <div class="header-box pt20">
    <Wheader></Wheader>
  </div>
  <div class="message-list-box pt20">
    <div class="content-box">
      <div class="about-me-box"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-box {
  // padding: 0 20px;
  width: 100%;
}
.message-list-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-box {
    width: 1140px;
    @media screen and (max-width: 1140px) {
      max-width: 100%;
    }
    .about-me-box {
    }
  }
}
</style>
