<script lang="ts" setup>
import WSectionHeader from "@/components/WSectionHeader.vue";
import selfIntroduce from "./components/selfIntroduce.vue";
import { visitorRecord } from "@/api/common.ts";
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
const userStroe = useUserStore();

onMounted(() => {
  // 记录访客
  let userInfo = {
    type: 0,
    nickname: userStroe.LoginInfo?.nickname || "nickname",
  };
  visitorRecord(userInfo);
});
</script>

<template>
  <div>
    <div class="introduct-self mt20">
      <selfIntroduce></selfIntroduce>
      <WSectionHeader :title="'INTRODUCE'"></WSectionHeader>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.introduct-self {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
