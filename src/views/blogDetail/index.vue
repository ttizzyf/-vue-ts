<script lang="ts" setup>
import { getArticleDetails, viewAriticle } from "@/api/article.ts";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMenusStore } from "@/store/menu";
import { TimeUtils } from "@/utils/time";
import WMarkdownRenderer from "@/components/WMarkdownRenderer.vue";
const menusAction = useMenusStore();
const router = useRouter();

// 文章详情
const articleDetails = ref();

// 文章id
const articleId = ref();

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
    menusAction.menuIndex = 2;
  }
  router.push({
    path: route,
  });
};

onMounted(() => {
  articleId.value = router.currentRoute.value.params.id;
  getArticleDetailsAPI(articleId.value);
  // 访客记录
  viewAriticle({ id: articleId.value });
});
</script>

<template>
  <div class="article-details-box pt40">
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
          <span class="mr5"> 目录 </span>
          <span class="mr5">
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
          <i class="iconfont mr5">&#xe663;</i>
          <span class="mr10">{{ articleDetails?.viewNum || 0 }}</span>
          <i class="iconfont mr5">&#xec8c;</i>
          <span>{{ articleDetails?.likeNum || 0 }}</span>
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
  }
}
</style>
