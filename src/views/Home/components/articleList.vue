<script lang="ts" setup>
import WSectionHeader from "@/components/WSectionHeader.vue";
import { getArticleList } from "@/api/article.ts";
import { ref, onMounted, Ref } from "vue";
import { articleItem } from "@/types/index";
import { dayjs } from "element-plus";
// 文章列表数据
const articleData = ref({
  params: {
    pageSize: 4,
    pageNum: 1,
  },
  total: 0,
});

// 文章数据列表
const articleList: Ref<articleItem[]> = ref([]);

const getArticleListAPI = async () => {
  const res = await getArticleList(articleData.value.params);
  articleList.value = res.data.data.data;
  console.log(articleList.value);
};

onMounted(() => {
  getArticleListAPI();
});
</script>

<template>
  <div>
    <WSectionHeader :title="'Technical Articles'"></WSectionHeader>
    <div class="article-box">
      <div class="side-stripe"></div>
      <div class="article-list-box">
        <div class="article-item" v-for="item in articleList" :key="item.id">
          <div class="article-content">
            <div class="article-name mb10">
              {{ item.title }}
            </div>
            <div class="article-abstract">
              <el-text class="text">
                {{ item.abstract }}
              </el-text>
            </div>
            <div class="article-tip">
              <span class="mr10">
                {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }} 发布
              </span>
              <span class="mr10">
                <i class="iconfont mr5">&#xec8c;</i>
                <span>{{ item.likeNum }}</span>
              </span>
              <span class="mr10">
                <i class="iconfont mr5">&#xe663;</i>
                <span>{{ item.viewNum }}</span>
              </span>
              <span>
                <i class="iconfont mr5">&#xe608;</i>
                <span>{{ item.messageNum }}</span>
              </span>
            </div>
          </div>
          <div class="article-cover">
            <el-image
              style="width: 100%; height: 150px"
              :src="item.cover"
              fit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-box {
  display: flex;
  // .side-stripe {
  //   width: 35%;
  //   height: 1000px;
  //   background: url("../../../assets/SVG/warning-stripes.svg") repeat 0 0;
  // }
  .article-list-box {
    width: 100%;
    .article-item {
      display: flex;
      // background-color: rgba($color: #ffffff, $alpha: 0.3);

      padding: 20px;
      justify-content: space-between;
      letter-spacing: 1px;
      cursor: pointer;
      opacity: 1;
      transition: all 0.3s linear;
      margin: 0 auto 2rem;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        border-radius: 10px;
        transform: translateY(-4px) scale(1.02);
        border: 1px solid #fff;
      }
      @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
      }

      .article-content {
        position: relative;
        width: 68%;
        padding-bottom: 40px;
        color: $seconed;
        @media screen and (max-width: 768px) {
          width: 100%;
        }
        .article-name {
          color: $seconed;
          font-size: 24px;
          font-weight: 700;
        }
        .article-abstract {
          .text {
            color: $seconed;
          }
        }
        .article-tip {
          color: $seconed;
          position: absolute;
          bottom: 0;
          font-size: 0.8rem;
        }
      }

      .article-cover {
        width: 30%;
        max-height: 160px;
        overflow: hidden;
        padding-top: 0.6rem;
        @media screen and (max-width: 768px) {
          width: 100%;
          max-height: 160px;
        }
      }
    }
  }
}
</style>
