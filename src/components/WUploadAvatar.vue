<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "store/user.ts";
import { emitUserInfoAPI } from "api/user.ts";
import { WMessage } from "@/utils/toast";
import "@/styles/index.scss";
import { isMobile } from "store/isMobile.ts";
const userStore = useUserStore();
const mobile = isMobile();
const headers = {
  authorization: userStore.LoginInfo?.token,
};

const avatarUrl = ref();

const uploadFileSuccess = async (data: any) => {
  avatarUrl.value = data.data.fileUrl;
  const res = await emitUserInfoAPI({ avatar: avatarUrl.value });
  console.log(res);
  if (res.data.status === 1) {
    userStore.LoginInfo.avatar = res.data.data.avatar;
    WMessage.success(res.data.message);
  }
  if (res.data.status === 0) {
    WMessage.error(res.data.message);
  }
  fileList.value = [];
};

const uploadFileError = (data: any) => {
  WMessage.error(data.message);
};

const fileList = ref();
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    :headers="headers"
    action="/w1/w1/common/upload"
    :multiple="false"
    :disabled="!userStore.LoginInfo"
    @success="uploadFileSuccess"
    @error="uploadFileError"
    :limit="1"
    :show-file-list="false"
  >
    <el-avatar
      :size="mobile.isMobileTerminal ? 50 : 80"
      class="pointer"
      :src="
        userStore.LoginInfo?.avatar
          ? userStore.LoginInfo.avatar
          : '../../public/defaultAvatar.png'
      "
    />
  </el-upload>
</template>

<style scoped lang="scss"></style>
