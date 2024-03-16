/**
 * 在主框架内显示
 * 路由配置说明
 * {
      path: '/dir-demo-info',    // 页面地址（唯一）
      name: 'dir-demo-info',     // 页面名称（唯一）
      hidden: false,              // 隐藏（不展示在侧边栏菜单）
      meta: {
          title: '用户管理',       // 页面标题
          icon: 'yonghuguanli',  // 页面图标
          cache: true,          // 页面是否进行缓存 默认true
          link: false,          // 页面是否是外链 默认false
          frameSrc: false,      // 页面是否是内嵌 默认false
          requiresAuth: true,   // 页面是否是需要登录 默认true
          perms: [               // 页面的操作的权限列表
              'sys:users:list',   // 查询
              'sys:users:create', // 增加
              'sys:users:update', // 更新
              'sys:users:delete', // 删除
          ],
      },
      component: () => import('@/views/sys/users/dir-users-info.vue'),// 懒加载页面组件
   }
 *
 */

/**
 * 路由主体
 */
const frameIn = [
  {
    path: "/",
    redirect: { path: "/home" },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("views/About/index.vue"),
        meta: {
          title: "关于我",
        },
      },
      {
        path: "/blog",
        name: "blog",
        component: () => import("views/Blog/index.vue"),
        meta: {
          title: "博客列表",
        },
      },
      {
        path: "/blogDetail/:id",
        name: "blogDetail",
        component: () => import("views/blogDetail/index.vue"),
        meta: {
          title: "博客详情",
        },
      },
      {
        path: "/friendLink",
        name: "friendLink",
        component: () => import("views/friendLink/index.vue"),
        meta: {
          title: "友链",
        },
      },
      {
        path: "/messageBoard",
        name: "messageBoard",
        component: () => import("views/MessageBoard/index.vue"),
        meta: {
          title: "留言板",
        },
      },
    ],
  },
];

const errorPage = [
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("views/404/index.vue"),
    meta: {
      title: "404",
    },
  },
];

export default [...frameIn, ...errorPage];
