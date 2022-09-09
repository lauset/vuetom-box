import type { RouteRecordRaw } from 'vue-router'

/**
 * 菜单路由
 *
 * meta属性
 *  text：国际化文本
 *  icon：对应的SVG图标
 *  isHide：是否隐藏
 *  transition: 动画
 */
const menuRoutes: any = [
  {
    path: '/board',
    name: 'Board',
    components: {
      default: () => import('@/views/main/board'),
    },
    meta: {
      text: 'menus.board',
      icon: 'MenuIconBoard',
      isHide: false,
    },
  },
  {
    path: '/info',
    name: 'System Info',
    component: () => import('@/views/main/info'),
    meta: {
      text: 'menus.info',
      icon: 'MenuIconList',
      isHide: false,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/main/settings'),
    meta: {
      text: 'menus.settings',
      icon: 'MenuIconSettings',
      isHide: false,
    },
  },
  {
    path: '/t404',
    name: 't404',
    redirect: '/4042',
    component: undefined,
    meta: {
      text: 'menus.page404',
      icon: 'Pouring',
      isHide: true,
    },
  },
  {
    path: '/menu',
    name: 'Menu',
    components: {
      left: () => import('@/layouts/MenuLeft'),
    },
    meta: {
      text: 'menus.menu',
      icon: 'Pouring',
      isHide: true,
    },
  },
]

const routes: Array<RouteRecordRaw> | any = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/404'),
    meta: {},
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/board',
    component: () => import('@/layouts/Home'),
    meta: {},
    children: menuRoutes,
  },
]

export { menuRoutes }
export default routes
