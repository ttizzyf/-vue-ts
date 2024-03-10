import { ref } from "vue";
import { defineStore } from "pinia";
import { webSettingType } from "@/types/index";

export const useMenusStore = defineStore("menus", () => {
  const page = ref("");
  // 顶部菜单路由索引
  const menuIndex = ref(0);
  // 侧边导航栏是否展示
  const isShowDrawer = ref(false);

  const changeDrawer = () => {
    isShowDrawer.value = true;
  };
  // 网站设置
  const webSetting = ref<webSettingType>({
    footerFiling: {
      auther: "",
      authorizationUrl: "",
      number: "",
    },
    selfIntroduce: {
      projectNum: "",
      selfSkill: "",
      time: "",
      webSkill: "",
    },
    theme: [],
    webInfo: {
      aboutMe: "",
      aboutWxUrl: "",
      webConnect: "",
      webIntroduce: "",
      homeSaying: "",
      webName: "",
      webVersion: "",
    },
  });
  return { isShowDrawer, changeDrawer, page, menuIndex, webSetting };
});
