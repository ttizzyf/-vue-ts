<script lang="ts" setup>
import Wheader from "@/components/Wheader.vue";
import { getArticleList } from "@/api/home.ts";
import { ref, watch, onMounted, computed } from "vue";
// @ts-ignore
import { Search } from "@element-plus/icons-vue";
const category = ref([
  { label: "全部", value: "" },
  { label: "技术", value: 1 },
  { label: "生活", value: 2 },
  { label: "其他", value: 3 },
]);

const articleListData = ref({
  params: {
    pageSize: 10,
    pageNum: 1,
  },
  searchData: "",
  list: [],
  total: 0,
});

// 获取文章列表
const getArticleListAPI = async () => {
  const res = await getArticleList(articleListData.value.params);
  console.log(res);
};

// 圆形旋转角度
const rotateValue = ref(0);

// 文章列表盒子dom元素
const articleListBox = ref();

// 文章盒子的高度
const articleListBoxHeight = ref();

let demoNum = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// 计算单个元素距离右侧的距离
const marginRightValues = computed(() => {
  return demoNum.value.map((_, index) => {
    // 根据 rotateValue 和 index 调整 margin-right 值
    const adjustedIndex = index - rotateValue.value;

    if (adjustedIndex === 0) return 200;
    if (adjustedIndex === 1) return 400;
    if (adjustedIndex === 2) return 200;

    return 0;
  });
});

// 盒子单次移动距离
const moveRange = ref();

const wheelMove = () => {
  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      rotateValue.value++;
    } else {
      rotateValue.value--;
    }
    console.log(rotateValue.value);
  });
};

watch(
  () => articleListData.value.params,
  () => {
    getArticleListAPI();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  moveRange.value = articleListBox.value.offsetHeight / 3;
  articleListBoxHeight.value = articleListBox.value.offsetHeight;
  wheelMove();
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
              v-for="(item, index) in category"
              :key="item.value"
            >
              <div class="tabs-icon" :class="'icon-color-' + (index + 1)"></div>
              <span class="fz12 tac mt10">
                {{ item.label }}
              </span>
            </div>
          </div>
          <div class="flex jcenter w100">
            <el-input
              style="width: 200px"
              v-model="articleListData.searchData"
            ></el-input>
          </div>
        </div>
      </div>
      <div ref="articleListBox" class="article-list">
        <div
          class="central-circle"
          :style="{ transform: `rotate(${rotateValue * 18}deg)` }"
        ></div>
        <div
          class="list-box flex column"
          :style="{ transform: `translate(0, ${-rotateValue * 200}px)` }"
        >
          <div
            v-for="(item, index) in demoNum"
            :key="item"
            class="article"
            :style="{
              transform: `translate(${-marginRightValues[index]}px,0)`,
            }"
          ></div>
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
      background-image: linear-gradient(90deg, #e25470, transparent);
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
        margin-bottom: 200px;
        height: 200px;
        width: 200px;
        background-color: #fff;
        transition: all 0.3s linear;
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
