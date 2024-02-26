<script lang="ts" setup></script>

<template>
  <div class="bottom-box">
    <div class="bg-box">
      <div class="intro">
        <div class="tabsLine">
          <span class="caps mr20"> // </span>
          <span class="nav pointer"> MANAGE </span>
          <span class="nav pointer"> GITHUB </span>
          <span class="nav pointer"> GITEE </span>
        </div>
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
  .intro {
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 100%;
    background-color: $main;
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
        background-image: linear-gradient(
          45deg,
          transparent 32px,
          #ffffff 32px
        );
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
}
</style>
