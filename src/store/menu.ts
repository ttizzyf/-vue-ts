import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenusStore = defineStore("menus", () => {
  const page = ref("");
  const menuIndex = ref(0);

  return { page, menuIndex };
});
