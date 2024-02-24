<script lang="ts" setup>
import selfIntroduce from "./components/selfIntroduce.vue";
import articleList from "./components/articleList.vue";
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
  <div class="introduct-self mt20">
    <selfIntroduce></selfIntroduce>
    <articleList></articleList>
  </div>
</template>

<style lang="scss" scoped></style>
