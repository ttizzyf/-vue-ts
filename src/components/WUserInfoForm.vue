<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
// import { useRouter } from "vue-router";
import { useUserStore } from "store/user.ts";
import { emitUserInfoAPI } from "api/user.ts";
import "@/styles/index.scss";
const userStore = useUserStore();

const userForm = ref({
  email: "",
  nickname: "",
  website: "",
});

// 获取用户信息
const getUserInfo = () => {
  userForm.value.email = userStore.LoginInfo?.email;
  userForm.value.nickname = userStore.LoginInfo?.nickname;
  userForm.value.website = userStore.LoginInfo?.website;
};

const isEdit = ref(false);

watch(
  userStore.LoginInfo,
  () => {
    getUserInfo();
  },
  { immediate: true, deep: true }
);

// 表单元素DOM
const userInfoDOM = ref();

const userRules = {
  email: [
    {
      required: true,
      message: "邮箱不能为空",
      trigger: "blur",
    },
    {
      type: "string",
      message: "邮箱格式错误",
      trigger: "blur",
      min: 10,
    },
  ],
  nickname: [
    {
      required: true,
      message: "昵称不能为空",
      trigger: "blur",
    },
    {
      type: "string",
      message: "昵称长度为2-12位",
      trigger: "blur",
      max: 12,
      min: 2,
    },
  ],
};

const clearForm = () => {
  userInfoDOM.value?.clearValidate();
  getUserInfo();
  isEdit.value = false;
};

const btnChangeOrSave = async () => {
  if (isEdit.value) {
    try {
      const { data } = await emitUserInfoAPI(userForm.value);
      if (data.data?.email) userStore.LoginInfo.email = data.data?.email;
      if (data.data?.nickname)
        userStore.LoginInfo.nickname = data.data?.nickname;
      if (data.data?.website || data.data?.website == "")
        userStore.LoginInfo.website = data.data?.website;
      clearForm();
    } catch (error) {
      clearForm();
    }
  } else {
    isEdit.value = true;
  }
};

onMounted(() => {});
</script>

<template>
  <div class="userInfoBox mt20">
    <el-form
      ref="userInfoDOM"
      :model="userForm"
      label-width="40"
      label-position="right"
      :rules="userRules"
      hide-required-asterisk
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" v-if="isEdit" />
        <div v-else>
          <el-text class="title" line-clamp="1">
            {{ userForm.email }}
          </el-text>
        </div>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userForm.nickname" v-if="isEdit" />
        <div v-else>
          <el-text class="title" line-clamp="1">
            {{ userForm.nickname }}
          </el-text>
        </div>
      </el-form-item>
      <el-form-item label="站点" prop="website">
        <el-input v-model="userForm.website" v-if="isEdit" />
        <div v-else>
          <el-text class="title" line-clamp="1">
            {{ userForm.website }}
          </el-text>
        </div>
      </el-form-item>
      <div class="flex jcenter">
        <div class="animationBtn pointer" @click="btnChangeOrSave">
          {{ isEdit ? "保存" : "修改" }}
        </div>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.userInfoBox {
  :deep(.el-form-item__label) {
    color: $primary;
  }
  :deep(.el-input__wrapper) {
    background-color: $main;
  }
  :deep(.el-input__inner) {
    color: $seconed;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px $seconed;
  }
  .title {
    color: $seconed;
  }
}
</style>
