<script lang="ts" setup>
import WSectionHeader from "@/components/WSectionHeader.vue";
import storage from "@/utils/storage";
import { ref, onMounted } from "vue";

let userInfo = ref();

onMounted(() => {
  let info = storage.get("userInfo");
  userInfo.value = info;
  console.log(userInfo.value);
});
</script>

<template>
  <div class="mb20">
    <WSectionHeader :title="'Message Board'"></WSectionHeader>
    <div class="welcome fz24 mb20 w100">
      欢迎留下你的足迹,让我知道你看过我的留言板。
    </div>
    <div class="message-list-box">
      <div class="message-from">
        <div class="userInfo-header flex">
          <img :src="userInfo?.avatar" alt="" />
          <div class="userInfo">
            <div class="name">{{ userInfo?.nickname }}</div>
            <div class="email">{{ userInfo?.platform }}</div>
          </div>
        </div>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.welcome {
  text-align: center;
  color: #d4d3d3;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.message-list-box {
  .message-from {
    width: 60%;
    padding: 1rem;
    .userInfo-header {
      gap: 1em;
      img {
        width: 2.5rem;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        transition: 0.5s;
        max-width: 100%;
        height: auto;
      }
      .userInfo {
        color: #ffffff;
        .email {
          font-size: 0.7rem;
          color: #a09f9f;
        }
      }
    }
  }
}
</style>
