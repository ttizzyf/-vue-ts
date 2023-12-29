import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes.ts";
import { useLoadingStore } from "../store/loading.ts";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
  routes,
});

// // 判断是否有权限
// function hasPermission(perms: [string], route: RouteRecordRaw) {
//   if (perms.includes("*")) return true;
//   if (route.meta && route.meta.perms) {
//     // @ts-ignore
//     // if已经判断perms不会为空,但是这个错没办法进行修改，所以禁止报错
//     return perms.some((perm) => route.meta.perms.includes(perm));
//   } else {
//     return false;
//   }
// }

router.beforeEach((to, from, next) => {
  const { setLoading } = useLoadingStore();
  // 如果没有权限,返回404页面
  if (to.matched.length === 0) {
    next("/404");
  } else {
    // 修改标题
    window.document.title =
      (to.query.title ? to.query.title : to.meta.title) +
      import.meta.env.VITE_APP_WEB_TITLE;
    if (to.path !== from.path) {
      setLoading(true);
    }
    next();
  }
});

router.afterEach((_to, _from, _next) => {
  const { setLoading } = useLoadingStore();
  setTimeout(() => {
    setLoading(false);
  }, 1000);
});

export default router;
