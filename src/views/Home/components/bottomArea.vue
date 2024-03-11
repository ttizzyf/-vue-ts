<script lang="ts" setup>
// 跳转页面
const jumpTo = (url: string) => {
  window.open(url, "_blank");
};
</script>

<template>
  <div class="bottom-box">
    <div class="bg-box"></div>
    <div class="intro">
      <div class="tabsLine">
        <span class="caps mr20"> // </span>
        <span class="nav pointer" @click="jumpTo('http://maixf.top:8002')">
          MANAGE
        </span>
        <span class="nav pointer" @click="jumpTo('https://github.com/ttizzyf')">
          GITHUB
        </span>
        <span
          class="nav pointer"
          @click="jumpTo('https://gitee.com/yequcailingzhi')"
        >
          GITEE
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-box {
  margin-top: 4rem;
}
.bg-box {
  position: relative;
  height: 256px;
  background-image: url("../../../assets/SVG/warning-stripes.svg");
  background-repeat: repeat;
}
.intro {
  bottom: 0;
  height: 100px;
  width: 100%;
  .tabsLine {
    padding-top: 10px;
    color: #ffffff;
    margin-top: 40px;
    position: relative;
    border-top: 2px solid #ffffff;
    &::after {
      content: "";
      display: block;
      width: 128px;
      height: 32px;
      position: absolute;
      right: 0;
      top: 0;
      background-image: linear-gradient(45deg, transparent 32px, #ffffff 32px);
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .nav {
      letter-spacing: 0.4em;
      margin-right: 1rem;
      @media screen and (max-width: 768px) {
        letter-spacing: 0.2em;
      }
      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
