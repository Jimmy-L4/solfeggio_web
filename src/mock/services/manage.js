import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 35

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: true,
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result,
  })
}
const studentList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      studentId: tmpKey,
      studentName: '张三' + tmpKey,
      class: '练耳' + pageNo + '班',
      grade: Mock.mock('@integer(0, 5)'),
      status: Mock.mock('@integer(0, 2)'),
      courseName: '视唱练耳与音乐基础(' + pageNo + ')',
      studyMode: '正常修读',
      updatedAt: Mock.mock('@datetime'),
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result,
  })
}

const commitList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      studentId: tmpKey,
      studentName: '张三' + tmpKey,
      AIscore: Mock.mock('@integer(0, 100)'),
      score: Mock.mock('@integer(0, 100)'),
      updatedAt: Mock.mock('@datetime'),
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result,
  })
}

const projects = () => {
  return builder({
    data: [
      {
        id: 1,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        title: '视唱',
        description: '单声部精唱',
        status: 1,
        lesson_No: '课次一',
        updatedAt: '2018-07-26 00:00:00',
      },
      {
        id: 2,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        title: '视唱',
        description: '单声部视谱即唱',
        status: 1,
        lesson_No: '课次一',
        updatedAt: '2018-07-26 00:00:00',
      },
      {
        id: 3,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        title: '视唱',
        description: '双声部',
        status: 1,
        lesson_No: '课次一',
        updatedAt: '2018-07-26 00:00:00',
      },
      {
        id: 4,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        title: '练耳',
        description: '练耳选择题',
        status: 1,
        lesson_No: '课次一',
        updatedAt: '2018-07-26 00:00:00',
      },
      {
        id: 5,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
        title: '练耳',
        description: '练耳听写题',
        status: 1,
        lesson_No: '课次一',
        updatedAt: '2018-07-26 00:00:00',
      },
    ],
    pageSize: 10,
    pageNo: 0,
    totalPage: 6,
    totalCount: 57,
  })
}

const activity = () => {
  return builder([
    {
      id: 1,
      user: {
        nickname: '',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
      project: {
        name: '课次一',
        action: '提交了',
        event: '单声部视谱即唱',
      },
      time: '2018-08-23 14:47:00',
    },
    {
      id: 1,
      user: {
        nickname: '蓝莓酱',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      },
      project: {
        name: '课次一',
        action: '提交了',
        event: '单声部精唱',
      },
      time: '2018-08-23 09:35:37',
    },
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: '@image(64x64)',
      },
      project: {
        name: '课次一',
        action: '提交了',
        event: '双声部',
      },
      time: '2017-05-27 00:00:00',
    },
    {
      id: 1,
      user: {
        nickname: '曲丽丽',
        avatar: '@image(64x64)',
      },
      project: {
        name: '课次一',
        action: '提交了',
        event: '音阶选择题',
      },
      time: '2018-08-23 14:47:00',
    },
    {
      id: 1,
      user: {
        nickname: '@name',
        avatar: '@image(64x64)',
      },
      project: {
        name: '课次一',
        action: '提交了',
        event: '音程选择题',
      },
      time: '2018-08-23 14:47:00',
    },
    {
      id: 1,
      user: {
        nickname: '曲丽丽',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
      project: {
        name: '课次一',
        action: '提交了',
        event: '和弦听写题',
      },
      time: '2018-08-23 14:47:00',
    },
  ])
}

const teams = () => {
  return builder([
    {
      id: 1,
      name: '科学搬砖组',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
    {
      id: 2,
      name: '程序员日常',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
    },
    {
      id: 1,
      name: '设计天团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
    },
    {
      id: 1,
      name: '中二少女团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
    },
    {
      id: 1,
      name: '骗你学计算机',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
    },
  ])
}

const radar = () => {
  return builder([
    {
      item: '引用',
      个人: 70,
      团队: 30,
      部门: 40,
    },
    {
      item: '口碑',
      个人: 60,
      团队: 70,
      部门: 40,
    },
    {
      item: '产量',
      个人: 50,
      团队: 60,
      部门: 40,
    },
    {
      item: '贡献',
      个人: 40,
      团队: 50,
      部门: 40,
    },
    {
      item: '热度',
      个人: 60,
      团队: 70,
      部门: 40,
    },
    {
      item: '引用',
      个人: 70,
      团队: 50,
      部门: 40,
    },
  ])
}

const notice = () => {
  return builder([
    {
      id: 1,
      user: {
        nickname: 'jimmy',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
      project: {
        title: '课次一',
        content:
          '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆,城镇中有那么多的酒馆，她却偏偏走进了我的酒馆，城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        class: '所有班级',
        type: 1,
      },
      startAt: '2018-08-23 14:47:00',
    },
    {
      id: 2,
      user: {
        nickname: 'jimmy',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
      project: {
        title: '课次一',
        content: '那是一种内在的东西， 他们到达不了，也无法触及的',
        class: '2021级管乐班',
        type: 1,
      },
      startAt: '2018-08-23 14:47:00',
    },
    {
      id: 3,
      user: {
        nickname: 'jimmy',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
      project: {
        title: '课次一',
        content: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        class: '21级管乐班',
        type: 1,
      },
      startAt: '2018-08-23 14:47:00',
    },
    {
      id: 4,
      user: {
        nickname: 'jimmy',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      },
      project: {
        title: '课次一',
        content: '生命就像一盒巧克力，结果往往出人意料',
        class: '21级作曲班',
        type: 0,
      },
      startAt: '2018-08-23 14:47:00',
    },
  ])
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/manage\/studentList/, 'get', studentList)
Mock.mock(/\/manage\/commitList/, 'get', commitList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
Mock.mock(/\/workplace\/notice/, 'get', notice)
