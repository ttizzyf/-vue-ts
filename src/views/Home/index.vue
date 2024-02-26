<script lang="ts" setup>
import headerArea from "./components/HeaderArea.vue";
import selfIntroduce from "./components/selfIntroduce.vue";
import articleList from "./components/articleList.vue";
import recentComments from "./components/recentComments.vue";
import messageBoard from "./components/messageBoard.vue";
import bottomArea from "./components/bottomArea.vue";
import { visitorRecord } from "@/api/common.ts";
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
const userStroe = useUserStore();

onMounted(() => {
  // 记录访客
  let userInfo = {
    type: 0,
    nickname: userStroe.LoginInfo?.nickname || "visitor",
  };
  visitorRecord(userInfo);
});
</script>

<template>
  <div class="mt20">
    <headerArea></headerArea>
    <selfIntroduce></selfIntroduce>
    <articleList></articleList>
    <recentComments></recentComments>
    <messageBoard></messageBoard>
    <bottomArea></bottomArea>
  </div>
</template>

<style lang="scss" scoped></style>
