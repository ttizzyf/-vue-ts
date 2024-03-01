<script lang="ts" setup>
import Wheader from "@/components/Wheader.vue";
import { getArticleList } from "@/api/home.ts";
import { ref, watch, onMounted, computed, Ref } from "vue";
import { articleItem, articleList } from "@/types";
import { TimeUtils } from "@/utils/time";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useEventListener } from "@vueuse/core";
const router = useRouter();
const category = ref([
  {
    label: "全部",
    value: "",
    color: "linear-gradient(90deg, #e25470, transparent)",
  },
  {
    label: "技术",
    value: 1,
    color: "linear-gradient(90deg, #7fbd5d, transparent)",
  },
  {
    label: "生活",
    value: 2,
    color: "linear-gradient(90deg, #d4b739, transparent)",
  },
  {
    label: "其他",
    value: 3,
    color: "linear-gradient(90deg, #de99ad, transparent)",
  },
]);

const articleListData: Ref<articleList> = ref({
  params: {
    pageSize: 10,
    pageNum: 1,
    category: "",
    title: "",
  },
  searchData: "",
  total: 0,
});

const articleList: Ref<Array<articleItem>> = ref([]);

// 切换分类
const switchCategory = (item: any) => {
  if (item.value === articleListData.value.params.category) return;
  articleListData.value.params.pageNum = 1;
  rotateValue.value = 0;
  articleListData.value.params.category = item.value;
  articleList.value = [];
};

// 获取文章列表
const getArticleListAPI = async () => {
  const res = await getArticleList(articleListData.value.params);
  articleList.value.push(...res.data.data.data);
  articleListData.value.total = res.data.data.count;
};

// 圆形旋转角度
const rotateValue = ref(0);

// 文章列表盒子dom元素
const articleListBox = ref();

// 文章盒子的高度
const articleListBoxHeight = ref();

// 计算单个元素距离右侧的距离
const marginRightValues = computed(() => {
  return articleList.value.map((_, index) => {
    // 根据 rotateValue 和 index 调整 margin-right 值
    const adjustedIndex = index - rotateValue.value;
    // 距离根据盒子高度计算
    if (adjustedIndex === 0) return articleListBoxHeight.value / 3;
    if (adjustedIndex === 1) return articleListBoxHeight.value / 2;
    if (adjustedIndex === 2) return articleListBoxHeight.value / 3;
    return 0;
  });
});

// 盒子单次移动距离和单个盒子高度
const moveRange = ref();

// 搜索文章
const seachArticleList = () => {
  articleListData.value.params.pageNum = 1;
  rotateValue.value = 0;
  articleList.value = [];
  articleListData.value.params.title = articleListData.value.searchData;
};

watch(
  () => articleListData.value.params,
  () => {
    getArticleListAPI();
  },
  { immediate: true, deep: true }
);

// 查看文章详情
const articleDetail = (item: articleItem) => {
  router.push({
    name: "blogDetail",
    params: {
      id: item.id,
    },
  });
};

const wheelEventHandler = (e: any) => {
  if (
    articleList.value.length < articleListData.value.total &&
    articleList.value.length === rotateValue.value + 2
  ) {
    articleListData.value.params.pageNum++;
  }
  if (e.deltaY > 0 && articleList.value.length !== rotateValue.value + 2) {
    rotateValue.value++;
  }
  if (e.deltaY < 0 && rotateValue.value > -1) {
    rotateValue.value--;
  }
};

onMounted(() => {
  moveRange.value = articleListBox.value.offsetHeight / 3;
  articleListBoxHeight.value = articleListBox.value.offsetHeight;
  useEventListener(window, "wheel", wheelEventHandler);
});
</script>

<template>
  <div class="blog-list-box pt20">
    <Wheader></Wheader>
    <div class="content-box flex">
      <div class="category-list">
        <div class="tabs-list flex column jcenter">
          <span class="category-title caps tac mb20"
            >PLEASE SELECT A CATEGORY</span
          >
          <div class="flex mb20">
            <div
              class="tabs-item flex column caps mr20 fz20 pointer"
              v-for="item in category"
              :key="item.value"
              @click="switchCategory(item)"
            >
              <div
                class="tabs-icon"
                :style="{ 'background-image': `${item.color}` }"
              ></div>
              <span class="fz12 tac mt10">
                {{ item.label }}
              </span>
            </div>
          </div>
          <div class="flex jcenter w100">
            <el-input
              style="width: 200px"
              v-model="articleListData.searchData"
              :prefix-icon="Search"
              @blur="seachArticleList"
            ></el-input>
          </div>
        </div>
      </div>
      <div ref="articleListBox" class="article-list">
        <div
          class="central-circle"
          :style="{
            transform: `rotate(${rotateValue * 18}deg)`,
            'background-image': `${
              category[
                !articleListData.params.category
                  ? 0
                  : articleListData.params.category as number
              ].color
            }`,
          }"
        ></div>
        <div
          class="list-box flex column"
          :style="{ transform: `translate(0, ${-rotateValue * moveRange}px)` }"
        >
          <div
            v-for="(item, index) in articleList"
            :key="item.id"
            @click="articleDetail(item)"
            class="article center pointer"
            :style="{
              transform: `translate(${-marginRightValues[index]}px,0) scale(${
                index - 1 === rotateValue ? '1.5' : '.8'
              })`,
              height: `${moveRange}px`,
            }"
          >
            <div class="image-box">
              <el-image
                style="width: 100%; height: 100%"
                :src="item.cover"
                fit="cover"
              />
            </div>
            <div class="article-info-box">
              <div class="w100 h32">
                <el-text size="large" style="color: #cccccc" line-clamp="1">
                  {{ item.title }}
                </el-text>
              </div>
              <div>
                <el-text size="small" style="color: #a1a0a0" line-clamp="3">
                  {{ item.abstract }}
                </el-text>
              </div>
              <div class="w100 article-info">
                <span class="mr5">{{
                  TimeUtils.formatRelativeTime(item.createdAt)
                }}</span>
                <span class="mr5 fz8">
                  <i class="iconfont mr5 fz8">&#xec8c;</i>
                  <span class="fz8">{{ item.likeNum }}</span>
                </span>
                <span class="mr5 fz8">
                  <i class="iconfont mr5 fz8">&#xe663;</i>
                  <span class="fz8">{{ item.viewNum }}</span>
                </span>
                <span>
                  <i class="iconfont mr5 fz8">&#xe608;</i>
                  <span class="fz8">{{ item.messageNum }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-list-box {
  height: 100vh;
  .content-box {
    position: relative;
    height: calc(100vh - 70px);
  }
  .category-list {
    position: relative;
    height: 100%;
    width: 30%;
    .tabs-list {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      padding-left: 20px;
      .category-title {
        color: #ffffff;
      }
      .tabs-item {
        color: #ffffff;
        &:hover {
          color: $primary;
        }
        .tabs-icon {
          height: 40px;
          width: 40px;
          border-radius: 20px;
        }
        .icon-color-1 {
          background-image: linear-gradient(90deg, #e25470, transparent);
        }

        .icon-color-2 {
          background-image: linear-gradient(90deg, #7fbd5d, transparent);
        }

        .icon-color-3 {
          background-image: linear-gradient(90deg, #d4b739, transparent);
        }

        .icon-color-4 {
          background-image: linear-gradient(90deg, #de99ad, transparent);
        }
      }
    }
  }
  .article-list {
    position: relative;
    width: 70%;
    height: 100%;
    overflow: hidden;

    .central-circle {
      width: calc(100vh - 70px);
      height: calc(100vh - 70px);
      position: absolute;
      border-radius: 50%;
      right: calc((-50vh + 35px));
      transform-origin: center;
      transition: all 0.3s linear;
    }
    .list-box {
      position: absolute;
      right: 0;
      transition: all 0.3s linear;
      .article {
        position: relative;
        height: 200px;
        width: 200px;
        transition: all 0.3s linear;
        .image-box {
          position: absolute;
          height: 200px;
          width: 260px;
          z-index: 2;
        }
        .article-info-box {
          display: flex;
          justify-content: start;
          flex-direction: column;
          padding: 10px 20px;
          position: absolute;
          left: -100%;
          top: 50%;
          transform: translate(-40%, -50%);
          height: 140px;
          width: 300px;
          background-color: #181818;
          box-shadow: 0px 0px 2.2px rgba(255, 255, 255, 0.02),
            0px 0px 5.3px rgba(255, 255, 255, 0.029),
            0px 0px 10px rgba(255, 255, 255, 0.036),
            0px 0px 17.9px rgba(255, 255, 255, 0.042),
            0px 0px 33.4px rgba(255, 255, 255, 0.051),
            0px 0px 80px rgba(255, 255, 255, 0.07);
          .article-info {
            position: absolute;
            bottom: 10px;
            color: #a1a0a0;
            font-size: 8px;
          }
        }
      }
    }
  }
}
:deep(.el-input__wrapper) {
  background-color: #000000;
}
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #ffffff inset !important;
}
:deep(.el-input__inner) {
  color: #ffffff;
}
</style>
