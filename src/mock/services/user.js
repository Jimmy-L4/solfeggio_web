import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '李崇明',
    username: 'admin',
    className: '2021级管乐班',
    curriculumName: '视唱练耳基础理论',
    password: '',
    avatar: '/avatar.png',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {},
  }
  // role
  const roleObj = {
    id: 'admin',
    name: '管理员',
    describe: '拥有所有权限',
    status: 1,
    creatorId: 'system',
    createTime: 1497160610259,
    deleted: 0,
    permissions: [
      {
        roleId: 'admin',
        permissionId: 'dashboard',
        permissionName: '仪表盘',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'exception',
        permissionName: '异常页面权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'result',
        permissionName: '结果权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'profile',
        permissionName: '详细页权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'table',
        permissionName: '表格权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'import',
            describe: '导入',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'form',
        permissionName: '表单权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'order',
        permissionName: '订单管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'permission',
        permissionName: '权限管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'role',
        permissionName: '角色管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'table',
        permissionName: '桌子管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
      {
        roleId: 'admin',
        permissionId: 'user',
        permissionName: '用户管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false,
          },
          {
            action: 'import',
            describe: '导入',
            defaultCheck: false,
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false,
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false,
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false,
          },
          {
            action: 'export',
            describe: '导出',
            defaultCheck: false,
          },
        ],
        actionList: null,
        dataAccess: null,
      },
    ],
  }

  roleObj.permissions.push({
    roleId: 'admin',
    permissionId: 'support',
    permissionName: '超级模块',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false,
      },
      {
        action: 'import',
        describe: '导入',
        defaultCheck: false,
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false,
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false,
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false,
      },
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false,
      },
    ],
    actionList: null,
    dataAccess: null,
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
const userNav = (options) => {
  const nav = [
    // home
    {
      name: 'home',
      parentId: 0,
      id: 100,
      meta: {
        icon: 'home',
        title: '主页',
        show: true,
      },
      component: 'MyWorkplace',
    },
    // 学习空间
    {
      name: 'study',
      parentId: 0,
      id: 200,
      meta: {
        icon: 'book',
        title: '学习空间',
        show: true,
      },
      redirect: '/study/sightsing-list',
      component: 'StudyLayout',
    },
    {
      name: 'sightsing-list',
      parentId: 200,
      id: 201,
      meta: {
        title: '视唱题目',
        show: true,
      },
      component: 'SightsingList',
    },
    {
      name: 'choice-list',
      parentId: 200,
      id: 202,
      meta: {
        title: '练耳选择题',
        show: true,
      },
      component: 'ChoiceList',
    },
    {
      name: 'dictation-list',
      parentId: 200,
      id: 203,
      meta: {
        title: '练耳听写题',
        show: true,
      },
      component: 'DictationList',
    },
    // 学生管理
    {
      name: 'management',
      parentId: 0,
      id: 300,
      meta: {
        icon: 'team',
        title: '学生管理',
        show: true,
      },
      component: 'StudentList',
    },
    // 作业空间
    {
      name: 'workbench',
      parentId: 0,
      id: 400,
      meta: {
        icon: 'form',
        title: '作业空间',
        show: true,
      },
      component: 'Workbench',
    },
    // 通知管理
    {
      name: 'bulletinboard',
      parentId: 0,
      id: 500,
      meta: {
        icon: 'notification',
        title: '通知管理',
        show: true,
      },
      component: 'BulletinBoard',
    },
    // 个人空间
    {
      name: 'account',
      parentId: 0,
      id: 600,
      meta: {
        title: '个人页面',
        icon: 'user',
        show: true,
      },
      redirect: '/account/center',
      component: 'RouteView',
    },
    {
      name: 'center',
      parentId: 600,
      id: 601,
      meta: {
        title: '个人中心',
        show: true,
      },
      component: 'AccountCenter',
    },
    {
      name: 'settings',
      parentId: 600,
      id: 602,
      meta: {
        title: '个人设置',
        hideHeader: true,
        hideChildren: true,
        show: true,
      },
      redirect: '/account/settings/basic',
      component: 'AccountSettings',
    },
    {
      name: 'BasicSettings',
      path: '/account/settings/basic',
      parentId: 602,
      id: 6021,
      meta: {
        title: '基本设置',
        show: false,
      },
      component: 'BasicSetting',
    },
    {
      name: 'NotificationSettings',
      path: '/account/settings/notification',
      parentId: 602,
      id: 6023,
      meta: {
        title: '新消息通知',
        show: false,
      },
      component: 'NotificationSettings',
    },
    // 答题空间
    {
      name: 'answer',
      parentId: 0,
      id: 700,
      meta: {
        title: '答题空间',
        icon: 'book',
        show: false,
      },
      redirect: '/answer/choice-layout',
      component: 'RouteView',
    },
    {
      name: 'choice',
      parentId: 700,
      id: 701,
      meta: {
        title: '选择题答题卡',
        show: false,
      },
      component: 'ChoiceLayout',
    },
    {
      name: 'sightsing',
      parentId: 700,
      id: 702,
      meta: {
        title: '视唱答题卡',
        show: false,
      },
      component: 'SightsingLayout',
    },
    {
      name: 'dictation',
      parentId: 700,
      id: 703,
      meta: {
        title: '听写题答题卡',
        show: false,
      },
      component: 'DictationLayout',
    },
    // 批改作业
    {
      name: 'correcting',
      parentId: 0,
      id: 800,
      meta: {
        title: '批改作业',
        icon: 'form',
        show: false,
      },
      component: 'Correcting',
    },
    // dashboard
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        icon: 'dashboard',
        title: '仪表盘',
        show: false,
      },
      component: 'RouteView',
      redirect: '/dashboard/workplace',
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: '工作台',
        show: false,
      },
      component: 'Workplace',
    },
    {
      name: 'monitor',
      path: 'https://www.baidu.com/',
      parentId: 1,
      id: 3,
      meta: {
        title: '监控页（外部）',
        target: '_blank',
        show: false,
      },
    },
    {
      name: 'Analysis',
      parentId: 1,
      id: 2,
      meta: {
        title: '分析页',
        show: false,
      },
      component: 'Analysis',
      path: '/dashboard/analysis',
    },

    // form
    {
      name: 'form',
      parentId: 0,
      id: 10,
      meta: {
        icon: 'form',
        title: '表单页',
        show: false,
      },
      redirect: '/form/base-form',
      component: 'RouteView',
    },
    {
      name: 'basic-form',
      parentId: 10,
      id: 6,
      meta: {
        title: '基础表单',
        show: false,
      },
      component: 'BasicForm',
    },
    {
      name: 'step-form',
      parentId: 10,
      id: 5,
      meta: {
        title: '分步表单',
        show: false,
      },
      component: 'StepForm',
    },
    {
      name: 'advanced-form',
      parentId: 10,
      id: 4,
      meta: {
        title: '高级表单',
        show: false,
      },
      component: 'AdvanceForm',
    },

    // list
    {
      name: 'list',
      parentId: 0,
      id: 10010,
      meta: {
        icon: 'table',
        title: '列表页',
        show: false,
      },
      redirect: '/list/table-list',
      component: 'RouteView',
    },
    {
      name: 'table-list',
      parentId: 10010,
      id: 10011,
      path: '/list/table-list/:pageNo([1-9]\\d*)?',
      meta: {
        title: '查询表格',
        show: false,
      },
      component: 'TableList',
    },
    {
      name: 'basic-list',
      parentId: 10010,
      id: 10012,
      meta: {
        title: '标准列表',
        show: false,
      },
      component: 'StandardList',
    },
    {
      name: 'card',
      parentId: 10010,
      id: 10013,
      meta: {
        title: '卡片列表',
        show: false,
      },
      component: 'CardList',
    },
    {
      name: 'search',
      parentId: 10010,
      id: 10014,
      meta: {
        title: '搜索列表',
        show: false,
      },
      redirect: '/list/search/article',
      component: 'SearchLayout',
    },
    {
      name: 'article',
      parentId: 10014,
      id: 10015,
      meta: {
        title: '搜索列表（文章）',
        show: false,
      },
      component: 'SearchArticles',
    },
    {
      name: 'project',
      parentId: 10014,
      id: 10016,
      meta: {
        title: '搜索列表（项目）',
        show: false,
      },
      component: 'SearchProjects',
    },
    {
      name: 'application',
      parentId: 10014,
      id: 10017,
      meta: {
        title: '搜索列表（应用）',
        show: false,
      },
      component: 'SearchApplications',
    },

    // profile
    {
      name: 'profile',
      parentId: 0,
      id: 10018,
      meta: {
        title: '详情页',
        icon: 'profile',
        show: false,
      },
      redirect: '/profile/basic',
      component: 'RouteView',
    },
    {
      name: 'basic',
      parentId: 10018,
      id: 10019,
      meta: {
        title: '基础详情页',
        show: false,
      },
      component: 'ProfileBasic',
    },
    {
      name: 'advanced',
      parentId: 10018,
      id: 10020,
      meta: {
        title: '高级详情页',
        show: false,
      },
      component: 'ProfileAdvanced',
    },

    // result
    {
      name: 'result',
      parentId: 0,
      id: 10021,
      meta: {
        title: '功能测试页面',
        icon: 'check-circle-o',
        show: false,
      },
      redirect: '/result/success',
      component: 'PageView',
    },
    {
      name: 'success',
      parentId: 10021,
      id: 10022,
      meta: {
        title: '测试',
        hiddenHeaderContent: true,
        show: false,
      },
      component: 'ResultSuccess',
    },
    // {
    //   name: 'fail',
    //   parentId: 10021,
    //   id: 10023,
    //   meta: {
    //     title: '失败',
    //     hiddenHeaderContent: true,
    //     show: false,
    //   },
    //   component: 'ResultFail',
    // },

    // Exception
    {
      name: 'exception',
      parentId: 0,
      id: 10024,
      meta: {
        title: '异常页',
        icon: 'warning',
        show: false,
      },
      redirect: '/exception/403',
      component: 'RouteView',
    },
    {
      name: '403',
      parentId: 10024,
      id: 10025,
      meta: {
        title: '403',
        show: false,
      },
      component: 'Exception403',
    },
    {
      name: '404',
      parentId: 10024,
      id: 10026,
      meta: {
        title: '404',
        show: false,
      },
      component: 'Exception404',
    },
    {
      name: '500',
      parentId: 10024,
      id: 10027,
      meta: {
        title: '500',
        show: false,
      },
      component: 'Exception500',
    },
  ]
  const json = builder(nav)
  console.log('json', json)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
