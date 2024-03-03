<script lang="ts" setup>
import WSectionHeader from "@/components/WSectionHeader.vue";
import { ref, onMounted, Ref } from "vue";
import { getMessageList } from "@/api/home.ts";
import { messageItem } from "@/types/home";
import { TimeUtils } from "@/utils/time";
import { useRouter } from "vue-router";
import { useMenusStore } from "@/store/menu";
import { WMessage } from "@/utils/toast";
import { createComment } from "@/api/article.ts";
import { useUserStore } from "@/store/user";

const menusStore = useMenusStore();

const userStore = useUserStore();

const router = useRouter();

const commentData = ref({
  commentContent: "",
  params: {
    pageSize: 5,
    pageNum: 1,
  },
});

// 留言列表
const commentsList: Ref<Array<messageItem> | null> = ref(null);

// 获取评论列表
const getcommentsListAPI = async () => {
  const res = await getMessageList(commentData.value.params);
  commentsList.value = res.data.data.data;
  console.log(commentsList.value);
};

// 跳转到留言板界面
const messageBoard = () => {
  router.push("/messageBoard");
  menusStore.menuIndex = 2;
};

// 发送留言
const snedMessage = async () => {
  if (!userStore.LoginInfo) {
    WMessage.error("用户未登录,请先登录");
    menusStore.changeDrawer();
    return;
  }
  if (commentData.value.commentContent.length === 0) {
    WMessage.error("评论内容不能为空");
    return;
  }
  const res = await createComment({
    content: commentData.value.commentContent,
  });
  console.log(res);
  if (res.data.status) {
    getcommentsListAPI();
    WMessage.success("感谢留下你的足迹");
    commentData.value.commentContent = "";
    return;
  }
};

onMounted(() => {
  getcommentsListAPI();
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
          <img
            :src="
              userStore.LoginInfo?.avatar ||
              '../../../../public/微信图片_20231214185224.jpg'
            "
            alt=""
          />

          <div class="userInfo">
            <div class="name">
              {{ userStore.LoginInfo?.nickname || "未登录" }}
            </div>
            <div class="email">{{ userStore.LoginInfo?.platform }}</div>
          </div>
        </div>
        <div class="comments-form mt20">
          <el-input
            type="textarea"
            placeholder="请输入评论内容"
            v-model="commentData.commentContent"
            maxlength="500"
            show-word-limit
            :rows="6"
          >
          </el-input>
          <div class="mt20 center">
            <div
              @click="snedMessage"
              class="animationBtn mr20"
              style="width: 144px"
            >
              SEND
            </div>
            <div
              v-if="!userStore.LoginInfo"
              @click="menusStore.changeDrawer"
              class="animationBtn"
              style="width: 144px"
            >
              LOGIN
            </div>
          </div>
        </div>
      </div>
      <ul class="comments-list">
        <li
          class="comment-item"
          v-for="item in commentsList"
          :key="item.messageId"
        >
          <el-avatar :size="40" :src="item.userInfo.avatar" />
          <div class="comment-info">
            <span class="title">
              <span class="name pr10 fw700 fz16">{{
                item.userInfo.nickname
              }}</span>
              <span class="time fz12">{{
                TimeUtils.formatRelativeTime(item.createdAt)
              }}</span>
            </span>
            <span class="content fz14">
              {{ item.content }}
            </span>
          </div>
        </li>
        <li class="load-more" @click="messageBoard">
          <i class="iconfont">&#xe667;</i>
          查看更多
        </li>
      </ul>
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
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 968px) {
    flex-direction: column;
  }
  .message-from {
    width: 60%;
    padding: 1rem;
    @media screen and (max-width: 968px) {
      width: 100%;
    }
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
    .comments-form {
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
    }
  }
  .comments-list {
    width: 40%;
    padding: 1.2rem 0 0 2rem;
    @media screen and (max-width: 968px) {
      width: 100%;
    }
    .comment-item {
      text-align: center;
      border-radius: 5px px;
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      margin-bottom: 1.5rem;
      background-position: top center;
      color: #ffffff;
      .comment-info {
        width: calc(100% - 60px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 5px 0 1.2rem;
        font-size: 1rem;
        text-align: left;
      }
    }
    .load-more {
      text-align: center;
      color: #adadad;
      cursor: pointer;
      transition: all 0.3s linear;
      font-weight: 700;
      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
