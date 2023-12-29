<script setup lang="ts">
import "@/styles/index.scss";
const props = defineProps({
  title: {
    type: [Number, String],
    default: () => "Tips",
  },
  disShowNum: {
    type: Boolean,
    default: () => false,
  },
});
</script>

<template>
  <div class="flex mt20 mb20">
    <div class="h64 por pl30 flex-grow flex section-header">
      <div class="title caps fz16 fw700">// {{ props.title }}</div>
    </div>
    <div class="bg-stripe h64"></div>
  </div>
</template>

<style lang="scss" scoped>
.section-header {
  color: $main;
  background-color: $seconed;
  z-index: 1;
  @media screen and (max-width: 768px) {
    height: 40px;
  }
  .title {
    font-family: "Poppins", sans-serif;
  }
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: -32px;
    background-image: linear-gradient(
      116.565deg,
      $seconed 50%,
      transparent 50%
    );
    content: "";
    display: block;
    height: 64px;
    width: 32px;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
.bg-stripe {
  width: 256px;
  background: url("../../public/stripe.svg") repeat 0 0;
  background-size: 16px;
  filter: drop-shadow($seconed 256px 0);
  transform: translateX(-256px);
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
