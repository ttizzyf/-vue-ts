<script lang="ts" setup>
import { getArticleDetails } from "@/api/article.ts";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import WMarkdownRenderer from "@/components/WMarkdownRenderer.vue";
const router = useRouter();

// 文章详情
const articleDetails = ref();

// 文章id
const articleId = ref();

// 获取文章详情
const getArticleDetailsAPI = async (id: string) => {
  const res = await getArticleDetails({ id });
  articleDetails.value = res.data.data;
  console.log(articleDetails.value);
};

onMounted(() => {
  articleId.value = router.currentRoute.value.params.id;
  getArticleDetailsAPI(articleId.value);
});
</script>

<template>
  <div class="article-details-box">
    <div class="details-box">
      <WMarkdownRenderer
        :markdownContent="articleDetails?.content ? articleDetails.content : ''"
      ></WMarkdownRenderer>
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
    max-width: 1140px;
    @media screen and (max-width: 1140px) {
      max-width: 100%;
    }
  }
}
</style>
