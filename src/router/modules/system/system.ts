export default {
  path: "/system",
  meta: {
    title: "系统管理"
  },
  children: [
    {
      path: "/user",
      name: "User",
      component: () => import("@/views/system/user/index.vue"),
      meta: {
        title: "用户管理"
      }
    },
    {
      path: "/role",
      name: "Role",
      component: () => import("@/views/system/role/index.vue"),
      meta: {
        title: "角色管理"
      }
    },
    {
      path: "/menu",
      name: "Menu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: {
        title: "菜单管理"
      }
    },
    {
      path: "/dept",
      name: "Dept",
      component: () => import("@/views/system/dept/index.vue"),
      meta: {
        title: "部门管理"
      }
    }
  ]
} as RouteConfigsTable;
