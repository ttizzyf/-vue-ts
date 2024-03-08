<script lang="ts" setup>
import { ref, watch, Ref } from "vue";
import {
  getMessageList,
  updateBlogCommentLikeOrOppose,
  createComment,
} from "@/api/article.ts";
import WCommentVue from "@/components/WComment.vue";
import { commentItem } from "@/types/index";
import { TimeUtils } from "@/utils/time";
import { createCommentType } from "@/types/index";
import { setCookie } from "@/utils/cookies.ts";
import { WMessage, WNotification } from "@/utils/toast";
import { useMenusStore } from "@/store/menu";
import { useUserStore } from "@/store/user";

const menusStore = useMenusStore();

const userStore = useUserStore();

const messageList: Ref<Array<commentItem>> = ref([]);

const messageListParams = ref({
  pageSize: 10,
  pageNum: 1,
});

const messageTotal = ref(0);

const getMessageListAPI = async () => {
  const res = await getMessageList(messageListParams.value);
  messageList.value.push(...res.data.data.data);
  messageTotal.value = res.data.data.count;
  console.log(messageList.value);
};

// 根据父级id获取内容更改数据列表
const getMessageByParentId = async (parentId: string) => {
  // 点赞更新获取留言列表
  const res = await getMessageList({
    pageSize: 1,
    pageNum: 1,
    messageId: parentId,
  });
  console.log(parentId);
  messageList.value.map((item, index) => {
    if (item.messageId === parentId) {
      messageList.value[index] = res.data.data.data[0];
    }
  });
};

// 留言点赞
const likeComment = (id: string, faId: string) => {
  updateBlogCommentLikeOrOppose({ id, likeOrOppose: "like" })
    .then(async (res) => {
      if (res.data.status) {
        setCookie(`comment-like-${id}`, true, 30);
        // 根据传回的父级id获取数据并替换数据列表
        getMessageByParentId(faId);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 留言反对
const opposeComment = (id: string, faId: string) => {
  updateBlogCommentLikeOrOppose({ id, likeOrOppose: "Oppose" })
    .then((res) => {
      if (res.data.status) {
        setCookie(`comment-oppose-${id}`, true, 30);
        getMessageByParentId(faId);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 回复留言
const replyComment = async (info: createCommentType, faId: string) => {
  const res = await createComment(info);
  if (res.data.status) {
    getMessageByParentId(faId);
    WNotification.success("回复成功");
  }
};

// 留言表单
const commentContent = ref();

const snedMessage = async () => {
  if (!userStore.LoginInfo) {
    WMessage.error("用户未登录,请先登录");
    menusStore.changeDrawer();
    return;
  }
  if (commentContent.value.length === 0) {
    WMessage.error("评论内容不能为空");
    return;
  }
  const res = await createComment({
    content: commentContent.value,
  });
  if (res.data.status) {
    console.log(res.data.data);
    const message = await getMessageList({
      pageSize: 1,
      pageNum: 1,
      messageId: res.data.data,
    });
    messageList.value.unshift(message.data.data.data[0]);
    messageTotal.value++;
    WMessage.success("感谢留下你的足迹");
    commentContent.value = "";
    return;
  }
};

watch(
  messageListParams.value,
  () => {
    getMessageListAPI();
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="message-board-box">
    <el-card class="mb20" shadow="hover">
      <div class="pb20">
        <i class="iconfont mr10">&#xe63e;</i>
        <span class="fz16">留下足迹</span>
        ( <i class="iconfont">&#xe608;</i> {{ messageTotal }} )
      </div>
      <div class="pb20">
        <el-input
          type="textarea"
          placeholder="请输入评论内容"
          v-model="commentContent"
          maxlength="500"
          show-word-limit
          :rows="6"
        >
        </el-input>
        <div class="mt20 center">
          <div
            @click="snedMessage"
            :class="['animationBtn', 'pointer', { mr20: !userStore.LoginInfo }]"
            style="width: 144px"
          >
            SEND
          </div>
          <div
            v-if="!userStore.LoginInfo"
            @click="menusStore.changeDrawer"
            class="animationBtn pointer"
            style="width: 144px"
          >
            LOGIN
          </div>
        </div>
      </div>
      <div class="message-list" v-if="messageList.length !== 0">
        <el-timeline>
          <el-timeline-item
            v-for="item in messageList"
            :key="item.messageId"
            :timestamp="TimeUtils.formatRelativeTime(item.createdAt)"
            placement="top"
          >
            <WCommentVue
              :comment="item"
              @like="likeComment"
              @oppose="opposeComment"
              @reply="replyComment"
            ></WCommentVue>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div
        v-if="!(messageList.length >= messageTotal)"
        class="center pointer primary-hover"
        @click="messageListParams.pageNum++"
      >
        加载更多<i class="iconfont ml5"> &#xe620;</i>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  box-shadow: 0 0 90px #00000026;
  -webkit-box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
}
.btnColor {
  background-color: #fff;
}
</style>
