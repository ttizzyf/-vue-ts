<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useMenusStore } from "../store/menu.ts";
import "@/styles/index.scss";
const router = useRouter();
const menuStore = useMenusStore();
// 选择路由的索引
const activeIndex = ref(menuStore.menuIndex);
// 经过路由的索引
const moveIndex = ref();

// 定义菜单项数据
const menuItems = [
  { name: "HOME", id: "home", path: "/home", icon: "&#xe62c;" },
  { name: "BLOG", id: "blog", path: "/blog", icon: "&#xe643;" },
  {
    name: "MESSAGEBOARD",
    id: "messageBoard",
    path: "/messageBoard",
    icon: "&#xe608;",
  },
  {
    name: "FRIENDLINK",
    id: "friendLink",
    path: "/friendLink",
    icon: "&#xeadc;",
  },
];

// 方法，显示选项底纹
const showOverlay = (index: number) => {
  moveIndex.value = index;
};
// 移除,取消经过
const outOverlay = () => {
  moveIndex.value = "";
};

// 方法，激活菜单项
const activateMenuItem = (
  index: number,
  item: { name: string; id: string; path: string }
) => {
  menuStore.menuIndex = index;
  activeIndex.value = index;
  router.push(item.path!);
};

onMounted(() => {});
</script>

<template>
  <div class="menu">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      class="menu-item mt10 pl20 pr20 fz12"
      :class="{ active: activeIndex === index || moveIndex === index }"
      @mouseover="showOverlay(index)"
      @mouseleave="outOverlay"
      @click="activateMenuItem(index, item)"
      ref="menuItem"
    >
      <i class="iconfont icon" v-html="item.icon"></i>
      <div class="caps menuName">{{ item.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  background-color: $main;
  color: $seconed;
  .menu-item {
    display: flex;
    height: 50px;
    line-height: 50px;
    .icon {
      font-size: 16px;
      margin-right: 20px;
    }
    .menuName {
      font-family: "Poppins", sans-serif;
    }
  }
  .active {
    color: $seconed;
    background-color: $primary;
    font-weight: 700;
  }
}
</style>
