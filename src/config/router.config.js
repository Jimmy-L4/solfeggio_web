// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/home',
    children: [
      // home
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/MyWorkplace'),
        meta: { title: '首页', keepAlive: true, icon: bxAnaalyse, permission: ['home'] },
        children: [],
      },
      // 学习空间
      {
        path: '/study',
        name: 'StudyLayout',
        component: () => import('@/views/study/StudyLayout'),
        redirect: '/study/sightsing-list',
        meta: { title: '学习空间', keepAlive: true, permission: ['home'] },
        children: [
          {
            path: '/study/sightsing-list',
            name: 'SightsingList',
            component: () => import('@/views/study/SightsingList'),
            meta: { title: '练耳题目列表', permission: ['home'] },
          },
          {
            path: '/study/dictation-list',
            name: 'DictationList',
            component: () => import('@/views/study/DictationList'),
            meta: { title: '听写题目列表', permission: ['home'] },
          },
          {
            path: '/study/choice-list',
            name: 'ChoiceList',
            component: () => import('@/views/study/ChoiceList'),
            meta: { title: '选择题列表', permission: ['home'] },
          },
        ],
      },
      // 答题空间
      {
        path: '/answer',
        name: 'AnswerSheet',
        component: RouteView,
        redirect: '/answer/choice-layout',
        meta: { title: '答题空间', keepAlive: true, permission: ['home'] },
        children: [
          {
            path: '/answer/choice-layout',
            name: 'ChoiceLayout',
            // hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/study/choice/ChoiceLayout'),
            meta: { title: '选择题答题页', keepAlive: true, permission: ['home'] },
          },
          {
            path: '/answer/sightsing-layout',
            name: 'SightsingLayout',
            // hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/study/sightsing/SightsingLayout'),
            meta: { title: '练耳题答题页', keepAlive: true, permission: ['home'] },
          },
          {
            path: '/answer/dictation-layout',
            name: 'DictationLayout',
            // hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/study/dictation/DictationLayout'),
            meta: { title: '听写题答题页', keepAlive: true, permission: ['home'] },
          },
        ],
      },
      // 学生管理
      {
        path: '/management',
        name: 'management',
        component: () => import('@/views/management/StudentList'),
        meta: { title: '学生管理', keepAlive: true, icon: bxAnaalyse, permission: ['home'] },
        children: [],
      },
      // 作业空间
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/Workbench'),
        meta: { title: '作业空间', keepAlive: true, icon: bxAnaalyse, permission: ['home'] },
        children: [],
      },
      {
        path: '/correcting',
        name: 'correcting',
        // hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/workbench/Correcting'),
        meta: { title: '作业批改页面', keepAlive: true, permission: ['home'] },
      },
      // 通知管理
      {
        path: '/bulletinboard',
        name: 'bulletinboard',
        component: () => import('@/views/bulletinboard/BulletinBoard'),
        meta: { title: '通知管理', keepAlive: true, icon: bxAnaalyse, permission: ['home'] },
        children: [],
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user'] },
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] },
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user'],
                },
              },
            ],
          },
        ],
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] },
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] },
          },
        ],
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] },
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] },
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] },
          },
        ],
      },

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register'),
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult'),
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined,
      },
    ],
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]
