<script setup lang="ts">
import "@/styles/index.scss";
import { dayjs } from "element-plus";
import { reactive, ref } from "vue";
import { getCookie } from "@/utils/cookies.ts";
import { WMessage } from "@/utils/toast";
import { useUserStore } from "@/store/user";
import { useMenusStore } from "@/store/menu";

const userStore = useUserStore();
const menuStore = useMenusStore();
const props = defineProps({
  comment: {
    type: Object,
    required: true,
    default: () => [],
  },
});
// 展示列表
const srcList = ref([]);

const state = reactive({
  show: {
    replies: false,
  },
  likeActive: (messageId: string) => getCookie(`comment-like-${messageId}`),
  opposeActive: (messageId: string) => getCookie(`comment-oppose-${messageId}`),
});

const emits = defineEmits(["modify", "like", "oppose", "delete", "reply"]);
// 喜欢
const likeComment = (id: string) => {
  if (state.likeActive(id)) return;
  emits("like", id);
};
// 反对
const opposeComment = (id: string) => {
  if (state.opposeActive(id)) return;
  emits("oppose", id);
};
const replyMessage = () => {
  if (!userStore.LoginInfo) {
    WMessage.error("请先登录");
    menuStore.changeDrawer();
    return;
  }
  if (replyMessageParams.value.content.length === 0) {
    return WMessage.error("评论内容不能为空");
  }
  emits("reply", replyMessageParams.value);
  cancelReplyMessage();
};
// 回复留言内容及id
const replyMessageParams = ref({
  // 回复目标消息id
  messagePid: "",
  // 回复用户
  toUserId: "",
  // 回复内容
  content: "",
  // 是否发送邮件
  isSendEmail: 0,
});

// 回复哪条消息
const replyMessageId = ref();
// 这是回复评论
const openReplyMessageBox = (
  message: any,
  messagePid: string | null = null
) => {
  if (messagePid) {
    replyMessageParams.value.messagePid = messagePid;
  } else {
    replyMessageParams.value.messagePid = message.messageId;
  }
  replyMessageId.value = message.messageId;
  replyMessageParams.value.toUserId = message?.userInfo.userId;
};

// 取消消息回复
const cancelReplyMessage = () => {
  replyMessageParams.value = {
    messagePid: "",
    toUserId: "",
    content: "",
    isSendEmail: 0,
  };
  replyMessageId.value = "";
};
</script>

<template>
  <el-card class="mb20">
    <div class="article-name" v-if="props.comment.articleInfo?.title">
      文章:<span class="fz16 text-primary ml5"
        >《{{ props.comment.articleInfo.title }}》</span
      >
    </div>
    <div class="comment-inner">
      <div class="comment-inner-avatar pointer mr10">
        <el-image
          fit="cover"
          :hide-on-click-modal="true"
          :preview-src-list="srcList"
          :src="props.comment.userInfo.avatar"
          @click="srcList.push(props.comment.userInfo.avatar as never)"
          @close="srcList = []"
          :initial-index="0"
          :min-scale="2"
        />
      </div>
      <div class="comment-inner-content fz14 por">
        <div class="comment-content-author warp column start">
          <div class="comment-content-author-name textColor fw700 fz14 lh1 mb5">
            {{ props.comment.userInfo.nickname }}
          </div>
          <div class="fz12 textColor">
            在{{
              dayjs(props.comment.createdAt).format("YYYY-MM-DD HH:mm:ss")
            }}说
          </div>
        </div>
        <div>
          {{ props.comment.content }}
        </div>
        <div class="comment-actions mt20">
          <span class="mr10">
            城市: {{ props.comment.userInfo.address || "未知" }}</span
          >
          <span class="mr10">
            操作平台: {{ props.comment.userInfo.platform || "未知" }}</span
          >
          <span
            :class="{ active: state.likeActive(props.comment.messageId) }"
            @click="likeComment(props.comment.messageId)"
          >
            赞同({{ props.comment.likeNum || 0 }})
          </span>
          <span
            :class="{ active: state.opposeActive(props.comment.messageId) }"
            @click="opposeComment(props.comment.messageId)"
          >
            反对({{ props.comment.opposeNum || 0 }})
          </span>
          <!-- 判断是否为评论页面 -->
          <span
            v-if="!props.comment.articleInfo"
            @click="openReplyMessageBox(props.comment)"
          >
            回复
          </span>
        </div>
        <div
          class="reply-message-box mt20"
          v-if="
            props.comment.messageId === replyMessageId &&
            !props.comment.articleInfo?.title
          "
        >
          <el-input
            v-model="replyMessageParams.content"
            :rows="6"
            type="textarea"
            placeholder="留言内容"
            maxlength="500"
            show-word-limit
          />
          <div class="mt10 flex">
            <span class="mr10 textColor">发送邮件:</span>
            <el-switch
              v-model="replyMessageParams.isSendEmail"
              class="ml-2"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              active-text="通知"
              inactive-text="不通知"
            ></el-switch>
          </div>
          <div class="flex mt10">
            <div
              @click="replyMessage"
              class="animationBtn pointer bg-primary mr20 w200"
            >
              回复消息
            </div>
            <div class="cancle-btn">
              <el-button @click="cancelReplyMessage">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-nested">
      <div
        class="reply-box mb20"
        v-for="item in props.comment.children"
        :key="item.messageId"
      >
        <div class="comment-inner-avatar pointer mr10">
          <el-image
            :hide-on-click-modal="true"
            :preview-src-list="srcList"
            @click="srcList.push(props.comment.userInfo.avatar as never)"
            @close="srcList = []"
            :initial-index="0"
            :min-scale="2"
            fit="cover"
            :src="item.userInfo.avatar"
          />
        </div>
        <div class="comment-inner-content fz14 por">
          <div class="comment-content-author warp column start">
            <span class="textColor fw700 fz14 lh1 mb5">
              {{ item.userInfo.nickname }}@{{ item.toUserInfo.nickname }}
            </span>
            <div class="fz12 textColor">
              在{{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}说
            </div>
          </div>
          <div>
            {{ item.content }}
          </div>
          <div class="comment-actions mt10">
            <span class="mr10">
              城市: {{ item.userInfo.address || "未知" }}</span
            >
            <span class="mr10">
              操作平台: {{ item.userInfo.platform || "未知" }}</span
            >
            <span
              :class="{ active: state.likeActive(item.messageId) }"
              @click="likeComment(item.messageId)"
            >
              赞同({{ item.likeNum || 0 }})
            </span>
            <span
              :class="{ active: state.opposeActive(item.messageId) }"
              @click="opposeComment(item.messageId)"
            >
              反对({{ item.opposeNum || 0 }})
            </span>
            <span
              v-if="!props.comment.articleInfo"
              @click="openReplyMessageBox(item, item.messagePid)"
            >
              回复
            </span>
          </div>
          <div
            class="reply-message-box mt20"
            v-if="
              item.messageId === replyMessageId &&
              !props.comment.articleInfo?.title
            "
          >
            <el-input
              v-model="replyMessageParams.content"
              :rows="6"
              type="textarea"
              placeholder="留言内容"
              maxlength="500"
              show-word-limit
            />
            <div class="mt10 flex">
              <span class="mr10 textColor">发送邮件:</span>
              <el-switch
                v-model="replyMessageParams.isSendEmail"
                class="ml-2"
                inline-prompt
                :active-value="1"
                :inactive-value="0"
                active-text="通知"
                inactive-text="不通知"
              ></el-switch>
            </div>
            <div class="flex mt10">
              <div
                @click="replyMessage"
                class="animationBtn pointer bg-primary mr20 w200"
              >
                回复消息
              </div>
              <div class="cancle-btn">
                <el-button @click="cancelReplyMessage">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.comment-inner {
  display: flex;
  padding: 16px 0;
}
.comment-inner-content {
  word-wrap: break-word;
  flex: 1 1 auto;
  min-width: 1px;
}
.comment-content-author {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
}
.textColor {
  color: #00000073;
}
.comment-actions {
  > span {
    color: #00000073;
    cursor: pointer;
    font-size: 12px;
    margin-right: 10px;
    transition: color 0.3s;
    &:hover {
      color: #595959;
    }
  }
}

.active {
  color: $primary !important;
}
.comment-nested {
  margin-left: 50px;
  .reply-box {
    display: flex;
  }
}
.comment-inner-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.reply-message-box {
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
:deep(.el-textarea__inner) {
  box-shadow: 0 0 90px #00000026;
  -webkit-box-shadow: 0 0 90px rgba(0, 0, 0, 0.15);
}
</style>
