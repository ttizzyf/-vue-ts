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
import { WNotification } from "@/utils/toast";

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
.message-board-box {
}
</style>
