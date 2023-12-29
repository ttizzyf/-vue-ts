import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const isMobile = defineStore("isMobile", () => {
  // 判断是否是移动端
  // 存储是否是移动端的状态
  const isMobileTerminal = ref(window.innerWidth <= 768);

  // 监听窗口大小变化
  const handleResize = () => {
    isMobileTerminal.value = window.innerWidth <= 768;
  };

  // 在 store 被创建时添加窗口大小变化事件监听
  watch(
    () => isMobileTerminal.value,
    () => {
      window.addEventListener("resize", handleResize);
    },
    { immediate: true } // 立即执行一次，以便在 store 创建时设置初始值
  );

  // 在 store 被销毁前移除窗口大小变化事件监听
  watch(
    () => isMobileTerminal.value,
    () => {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  );

  return { isMobileTerminal };
});
