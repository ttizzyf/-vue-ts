<script lang="ts" setup>
import { ref } from "vue";
import { createFriendLink } from "@/api/common";
import { useUserStore } from "@/store/user";
import { WNotification } from "@/utils/toast";
const userStore = useUserStore();
const friendLinkParams = ref({
  email: userStore.LoginInfo.email,
  linkName: "",
  link: userStore.LoginInfo.website,
  describe: "",
});

const emits = defineEmits(["layout"]);

const createFriendLinkRules = ref({
  linkName: [
    {
      required: true,
      message: "友链名称不能为空",
      trigger: "blur",
    },
  ],
  link: [
    {
      required: true,
      message: "友链地址不能为空",
      trigger: "blur",
    },
  ],
  describe: [
    {
      required: true,
      message: "网站描述不能为空",
      trigger: "blur",
    },
  ],
});
// 退出并清空表单
const layout = () => {
  friendLinkParams.value = {
    email: userStore.LoginInfo.email,
    linkName: "",
    link: userStore.LoginInfo.website,
    describe: "",
  };
  emits("layout");
};
// 友链表单dom
const friendLinkDOM = ref();

const onCreate = () => {
  friendLinkDOM.value.validate(async (valid: Boolean) => {
    if (valid) {
      const res = await createFriendLink(friendLinkParams.value);
      console.log(res);
      if (res.data.status) {
        WNotification.success("已提交友链,待审核");
        layout();
      }
    }
  });
};
</script>

<template>
  <div class="mt20">
    <el-form
      :model="friendLinkParams"
      :rules="createFriendLinkRules"
      ref="friendLinkDOM"
      label-width="60px"
      label-position="right"
      hide-required-asterisk
    >
      <el-form-item label="名称" prop="linkName">
        <el-input
          v-model="friendLinkParams.linkName"
          placeholder="请输入友链名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="link">
        <el-input
          v-model="friendLinkParams.link"
          placeholder="请输入友链地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="link">
        <el-input
          v-model="friendLinkParams.describe"
          placeholder="请输入友链地址"
          type="textarea"
          rows="6"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCreate">创建</el-button>
        <el-button @click="layout">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item.is-error .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}
:deep(.el-form-item__label) {
  color: #ebebeb;
}
:deep(.el-input__wrapper) {
  background-color: transparent !important;
  box-shadow: none !important;
  border-bottom: 1px solid #ffffff;
  border-radius: 0 !important;
}
:deep(.el-input__inner) {
  background-color: transparent !important;

  color: #ffffff !important;
}
:deep(.el-textarea__inner) {
  background-color: transparent !important;
  box-shadow: none !important;
  border-bottom: 1px solid #ffffff;
  color: #ffffff !important;
  border-radius: 0 !important;
}
:deep(.el-textarea .el-input__count) {
  background-color: transparent !important;
}

:deep(.el-textarea__inner::-webkit-scrollbar) {
  width: 2px;
  height: 2px;
}
:deep(.el-textarea__inner::-webkit-scrollbar-thumb) {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
:deep(.el-textarea__inner::-webkit-scrollbar-track) {
  background-color: transparent;
}
</style>
