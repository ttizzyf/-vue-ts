import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenusStore = defineStore("menus", () => {
  const page = ref("");
  // 顶部菜单路由索引
  const menuIndex = ref(0);
  // 侧边导航栏是否展示
  const isShowDrawer = ref(false);

  const changeDrawer = () => {
    isShowDrawer.value = true;
  };
  return { isShowDrawer, changeDrawer, page, menuIndex };
});
