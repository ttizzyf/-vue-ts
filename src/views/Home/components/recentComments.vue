<script lang="ts" setup>
import WSectionHeader from "@/components/WSectionHeader.vue";
import { getCommentsList } from "@/api/home.ts";
import { ref, onMounted, Ref } from "vue";
import { commentItem, reqPage } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

interface commentsListData {
  params: reqPage;
  list: Array<commentItem>;
}

const commentsListData: Ref<commentsListData> = ref({
  params: {
    pageSize: 6,
    pageNum: 1,
  },
  list: [],
});

const getCommentsListAPI = async () => {
  const res = await getCommentsList(commentsListData.value.params);
  commentsListData.value.list = res.data.data.data;
  console.log(commentsListData.value.list);
};

// 点击文章跳转详情页
const articleDetail = (id: string) => {
  router.push({
    name: "blogDetail",
    params: {
      id,
    },
  });
};

onMounted(() => {
  getCommentsListAPI();
});
</script>

<template>
  <div class="mb20">
    <WSectionHeader :title="'Recent Comments'"></WSectionHeader>
    <div class="comments-list-box">
      <div
        class="comments-item"
        v-for="item in commentsListData.list"
        @click="articleDetail(item.articleInfo.id)"
        :key="item.messageId"
      >
        <div class="author flex">
          <img :src="item.userInfo.avatar" alt="" />
          <div class="userInfo">
            <div class="name">{{ item.userInfo.nickname }}</div>
            <div class="time">{{ item.createdAt }}</div>
          </div>
        </div>
        <div class="content-text">
          <div class="content">{{ item.content }}</div>
          <div class="article-info">发表在「{{ item.articleInfo.title }}」</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments-list-box {
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 968px) {
    flex-direction: column;
  }
  .comments-item {
    font-size: 0.8rem;
    width: 33.3%;
    padding: 1rem;
    // border-right: 1px dashed #eee;
    cursor: pointer;
    margin-bottom: 1rem;
    @media screen and (max-width: 968px) {
      width: 100%;
      border-right: none;
    }
    .author {
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
        .time {
          font-size: 0.7rem;
          color: #a09f9f;
        }
      }
    }
    .content-text {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1em;
      text-align: justify;
      justify-content: space-between;
      word-break: break-all;
      overflow-wrap: anywhere;
      margin-top: 0.8rem;
      .content {
        color: #ffffff;
        height: 87px;
        overflow: hidden;
        font-size: 0.8rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
    .article-info {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 0.8rem;
      color: #b6b5b5;
    }
  }
}
</style>
