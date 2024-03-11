<script lang="ts" setup>
import {
  getArticleDetails,
  viewAriticle,
  getCommentsListByArticleId,
  createComment,
  updateBlogCommentLikeOrOppose,
  likeArticle,
} from "@/api/article.ts";
import { ref, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import { useMenusStore } from "@/store/menu";
import { TimeUtils } from "@/utils/time";
import WMarkdownRenderer from "@/components/WMarkdownRenderer.vue";
import WSectionHeader from "@/components/WSectionHeader.vue";
import WCommentVue from "@/components/WComment.vue";
import { commentItem, createCommentType } from "@/types/index.ts";
import { useUserStore } from "@/store/user";
import { WMessage, WNotification } from "@/utils/toast";
import { setCookie, getCookie } from "@/utils/cookies.ts";
import { useEventListener } from "@vueuse/core";
import { visitorRecord } from "@/api/common.ts";

const userStroe = useUserStore();
const menusAction = useMenusStore();
const router = useRouter();

// 文章详情
const articleDetails = ref();

// 文章id
const articleId = ref();
// 是否打开目录
const isOpenDirectory = ref(false);

// 获取文章详情
const getArticleDetailsAPI = async (id: string) => {
  const res = await getArticleDetails({ id });
  articleDetails.value = res.data.data;
  console.log(articleDetails.value);
};

// 返回博文列表或首页
const back = (route: string) => {
  if (route === "/home") {
    menusAction.menuIndex = 0;
  } else {
    menusAction.menuIndex = 1;
  }
  router.push({
    path: route,
  });
};

const articleCommentsParams = ref({
  pageSize: 10,
  pageNum: 1,
  relatedArticleId: "",
});

const commentList: Ref<Array<commentItem>> = ref([]);

// 根据文章id获取评论列表
const getCommentsListByArticleIdAPI = async () => {
  const res = await getCommentsListByArticleId(articleCommentsParams.value);
  commentList.value = res.data.data.rows;
};

// 是否打开评论输入框
const isOpenComment = ref(false);

// 评论输入框
const commentInput = ref("");

// 打开评论表单
const writeComment = () => {
  isOpenComment.value = !isOpenComment.value;
  if (!isOpenComment.value) {
    commentInput.value = "";
  }
};

// 发送评论
const sendComment = async () => {
  if (!userStroe.LoginInfo) {
    menusAction.changeDrawer();
    WMessage.error("请先登录");
    return;
  }
  console.log(userStroe.LoginInfo);
  if (commentInput.value.length === 0) {
    return WMessage.error("评论内容不能为空");
  }
  const res = await createComment({
    relatedArticleId: router.currentRoute.value.params.id as string,
    content: commentInput.value,
  });
  console.log(res);
  getCommentsListByArticleIdAPI();
  commentInput.value = "";
  isOpenComment.value = false;
};

// 点赞评论
const likeComment = (id: string) => {
  updateBlogCommentLikeOrOppose({ id, likeOrOppose: "like" })
    .then((res) => {
      if (res.data.status) {
        setCookie(`comment-like-${id}`, true, 30);
        getCommentsListByArticleIdAPI();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("点赞");
};

// 反对评论
const opposeComment = (id: string) => {
  updateBlogCommentLikeOrOppose({ id, likeOrOppose: "Oppose" })
    .then((res) => {
      if (res.data.status) {
        setCookie(`comment-oppose-${id}`, true, 30);
        getCommentsListByArticleIdAPI();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// 回复评论
const replyComment = async (info: createCommentType) => {
  const res = await createComment({
    ...info,
    relatedArticleId: articleCommentsParams.value.relatedArticleId,
  });
  if (res.data.status) {
    WNotification.success("回复成功");
    getCommentsListByArticleIdAPI();
  }
};

// 记录访客
const visitorRecordAPI = () => {
  // 记录访客
  let userInfo = {
    type: 0,
    nickname: userStroe.LoginInfo?.nickname || "visitor",
  };
  visitorRecord(userInfo);
};

// 点赞文章
const likeArticleAPI = async () => {
  if (getCookie(`article-like-${articleId.value}`)) return;
  const res = await likeArticle({ id: articleId.value });
  if (res.data.status) {
    setCookie(`article-like-${articleId.value}`, true, 30);
    articleDetails.value.likeNum++;
  }
};

onMounted(() => {
  articleId.value = router.currentRoute.value.params.id;
  articleCommentsParams.value.relatedArticleId = articleId.value;
  getArticleDetailsAPI(articleId.value);
  // 访客记录
  viewAriticle({ id: articleId.value });
  // 获取评论列表
  getCommentsListByArticleIdAPI();
  // 监测屏幕宽度
  useEventListener(window, "resize", () => {
    if (window.innerWidth < 768) {
      isOpenDirectory.value = false;
    }
  });
  // 记录访客
  visitorRecordAPI();
});
</script>

<template>
  <div class="article-details-box pt40 pb20">
    <div class="details-box">
      <div class="article-details-header">
        <i class="iconfont pointer mr10" @click="back('/home')"> &#xe707;</i>
        <span class="mr10 pointer list" @click="back('/blog')">博客列表</span>
        <span class="mr10">/</span>
        <span class="mr10 pointer active">博客详情</span>
      </div>
      <div class="article-info pt20 pb20">
        <div class="title">
          {{ articleDetails?.title ? articleDetails.title : "" }}
        </div>
        <div class="tip">
          <span class="mr5 directory"> 目录 </span>
          <span class="mr5 directory">
            <el-switch
              v-model="isOpenDirectory"
              class="ml-2"
              size="small"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #cccccc;
              "
            />
          </span>
          <i class="iconfont mr5">&#xe63d;</i>
          <span class="nickname mr5">
            {{ articleDetails?.userInfo.nickname }}
          </span>
          <span class="iconfont mr5">&#xe647;</span>
          <span>{{
            TimeUtils.formatRelativeTime(
              articleDetails?.createdAt ? articleDetails?.createdAt : 0
            )
          }}</span>
        </div>
      </div>
      <div class="stripe"></div>
      <WMarkdownRenderer
        :markdownContent="articleDetails?.content ? articleDetails.content : ''"
        :showToc="isOpenDirectory"
      ></WMarkdownRenderer>
      <div class="article-Data">
        <span class="category">
          #
          {{
            articleDetails?.category === 1
              ? "技术"
              : articleDetails?.category === 2
              ? "生活"
              : "其他"
          }}
        </span>
        <div class="data">
          <span class="pointer">
            <i class="iconfont mr5">&#xe663;</i>
            <span class="mr10">{{ articleDetails?.viewNum || 0 }}</span>
          </span>
          <span
            @click="likeArticleAPI"
            :class="[
              'pointer',
              { active: getCookie(`article-like-${articleId}`) },
            ]"
          >
            <i class="iconfont mr5">&#xec8c;</i>
            <span>{{ articleDetails?.likeNum || 0 }}</span>
          </span>
        </div>
      </div>
      <div class="reship" v-if="articleDetails?.isReship === 1">
        <p>
          转载：-
          <a :href="articleDetails?.isReshipUrl" target="_blank">
            <span>《{{ articleDetails?.isReshipName }}》</span></a
          >
        </p>
        <p>
          著名：如侵犯您的版权，请
          <span><router-link to="/">联系我</router-link></span>
          回复原文章的地址，我会给您删除此文章，给您带来不便请您谅解！
        </p>
      </div>
      <WSectionHeader :title="'评论'"></WSectionHeader>
      <div class="mb10">
        <div class="comment-box mb40 flex column jcenter">
          <span
            class="write-comment pointer primary-hover"
            @click="writeComment"
          >
            写评论
            <i class="iconfont ml5">&#xe618;</i>
          </span>
          <div v-if="isOpenComment" class="conment-input-box">
            <el-input
              v-model="commentInput"
              :rows="6"
              type="textarea"
              placeholder="留言内容"
              maxlength="500"
              show-word-limit
            />
            <div class="mt20 center">
              <div
                :class="[
                  'animationBtn',
                  'mr20',
                  'btnDisabled',
                  { disabled: !userStroe.LoginInfo },
                ]"
                style="width: 144px"
                @click="sendComment"
              >
                SEND
              </div>
              <div
                class="animationBtn"
                v-if="!userStroe.LoginInfo"
                style="width: 144px"
                @click="menusAction.changeDrawer"
              >
                LOGIN
              </div>
            </div>
          </div>
        </div>
        <template v-if="commentList?.length > 0">
          <WCommentVue
            v-for="item in commentList"
            :key="item.messageId"
            :comment="item"
            @like="likeComment"
            @oppose="opposeComment"
            @reply="replyComment"
          ></WCommentVue>
        </template>
        <div v-else class="empty-box flex column jcenter">
          <img src="../../../public/empty.png" alt="" />
          <span>当前评论为空</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-details-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .details-box {
    width: 1140px;
    @media screen and (max-width: 1140px) {
      max-width: 100%;
    }
    .article-details-header {
      width: 1140px;
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      background-color: #cbcbcb;
      position: fixed;
      top: 0;
      left: 50%;
      color: #ffffff;
      transform: translate(-50%, 0);
      z-index: 10;
      @media screen and (max-width: 1140px) {
        max-width: 100%;
      }
      .active {
        color: $primary;
      }
      > i {
        transition: all 0.3s linear;
        &:hover {
          color: $primary;
        }
      }
      .list {
        transition: all 0.3s linear;
        &:hover {
          color: $primary;
        }
      }
    }
    .article-info {
      .title {
        color: #ffffff;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      .tip {
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        color: #afafaf;
        .directory {
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }
    .stripe {
      width: 100%;
      background: url("../../../public/stripe.svg") repeat 0 0;
      background-size: 16px;
      padding: 16px;
    }
    .article-Data {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 3rem auto;
      font-size: 0.9rem;
      color: #afafaf;
    }
    .reship {
      width: 100%;
      min-height: 120px;
      background-color: #ffffff;
      position: relative;
      margin: 3rem auto;
      box-sizing: border-box;
      padding: 2rem;

      &:before {
        content: "";
        position: absolute;
        top: -18px;
        left: 50%;
        border: 10px solid transparent;
        border-bottom-color: #ffffff;
      }
      a {
        color: $primary;
      }
    }
    .comment-box {
      .write-comment {
        font-size: 1.5rem;
        color: #afafaf;
      }
      .conment-input-box {
        width: 100%;
        padding: 1.25rem 2.5rem;
        @media screen and (max-width: 1140px) {
          padding: 1.25rem 1.25rem;
        }
        .btnDisabled {
          color: #000000;
          background-color: #ffffff !important;
        }
      }
    }
    .empty-box {
      height: 200px;
      img {
        height: 190px;
        width: auto;
      }
      span {
        color: #afafaf;
        font-size: 0.9rem;
      }
    }
  }
}
.active {
  color: $primary;
}
</style>
