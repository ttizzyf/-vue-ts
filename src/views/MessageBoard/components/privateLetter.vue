<script lang="ts" setup>
import { ref } from "vue";
import { privateLetter } from "@/api/common";
import { WMessage } from "@/utils/toast";

// 提交表单
const FormData = ref({
  email: "",
  content: "",
});
// 加载中
const loading = ref(false);
// 校验规则
const rules = ref({
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: "blur",
    },
  ],
  content: [{ required: true, message: "请输入您的留言内容", trigger: "blur" }],
});

const formDom = ref();
// 提交表单
const submitForm = () => {
  formDom.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      const res = await privateLetter(FormData.value);
      if (res.data.status) {
        WMessage.success(res.data.message);
        resetForm();
      }
      loading.value = false;
    } else {
      WMessage.error("数据内容错误");
      return false;
    }
  });
};

// 重置表单
const resetForm = () => {
  formDom.value.resetFields();
};
</script>

<template>
  <div class="about-me-box">
    <el-card class="mb20" shadow="hover">
      <div class="pb20">
        <i class="iconfont mr10">&#xe63e;</i>
        <span class="fz16">给我私信</span>
      </div>
      <el-form
        :model="FormData"
        v-loading="loading"
        :rules="rules"
        ref="formDom"
        label-width="80px"
        class="demo-FormData"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="FormData.email"
            maxlength="32"
            placeholder="请输入邮箱"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            v-model="FormData.content"
            placeholder="请输入私信内容"
            maxlength="255"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm"
            >提交</el-button
          >
          <el-button size="small" @click="resetForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <div class="from-tro">
            <p>邮箱只是作为博主回复私信渠道</p>
            <p>您的私信不会展示在这里，只有博主会看到...</p>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.from-tro {
  display: flex;
  flex-direction: column;
}
</style>
