import setting from "@/setting";
import { ref } from "vue";
import { useMenusStore } from "@/store/menu";

const menuStore = useMenusStore();

// 主题切换逻辑
let themeIndex = ref(0);

let themeLength = ref(
  menuStore.webSetting.theme.length || setting.theme.list.length
);

const ChangeColor = () => {
  if (themeIndex.value >= themeLength.value - 1) {
    themeIndex.value = 0;
  } else {
    themeIndex.value++;
  }
  let colorGroup = setting.theme.list[themeIndex.value];
  document
    .getElementsByTagName("body")[0]
    .style.setProperty("--primary", `${colorGroup.primary}`);
  document
    .getElementsByTagName("body")[0]
    .style.setProperty("--main", `${colorGroup.bg}`);
  document
    .getElementsByTagName("body")[0]
    .style.setProperty("--seconed", `${colorGroup.text}`);
};

export default ChangeColor;
