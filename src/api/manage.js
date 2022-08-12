import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  studentList: '/manage/studentList',
  commitList: '/manage/commitList',
  noticeList: '/api/notice/',
  ChoiceQuesList: '/api/question/choice/',
  SightsingingList: '/api/question/sightsinging_list/',
  ChoiceList: '/api/question/choice_list/',
  QuesGroupList: '/api/homework/quse_group/',
  ChoiceRecord: '/api/homework/choice/',
  SightsingingRecord: '/api/homework/sightsinging/',
  UploadAudio: '/api/router/audio/',
}

export default api

export function getUserList(parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter,
  })
}

export function getRoleList(parameter) {
  return request({
    url: api.role,
    method: 'get',
    params: parameter,
  })
}

export function getServiceList(parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter,
  })
}

export function getPermissions(parameter) {
  return request({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter,
  })
}

export function getOrgTree(parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter,
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return request({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter,
  })
}

export function saveSub(sub) {
  return request({
    url: '/sub',
    method: sub.id === 0 ? 'post' : 'put',
    data: sub,
  })
}
// 获得学生列表
export function getStudentList(parameter) {
  return request({
    url: api.studentList,
    method: 'get',
    params: parameter,
  })
}
export function getCommitList(parameter) {
  return request({
    url: api.commitList,
    method: 'get',
    params: parameter,
  })
}

export function getNoticeList(parameter) {
  return request({
    url: api.noticeList,
    method: 'get',
    params: parameter,
  })
}
export function updateNotice(parameter) {
  return request({
    url: api.noticeList,
    method: 'put',
    data: parameter,
  })
}
export function addNotice(parameter) {
  return request({
    url: api.noticeList,
    method: 'post',
    data: parameter,
  })
}
export function deleteNotice(parameter) {
  return request({
    url: api.noticeList,
    method: 'delete',
    data: parameter,
  })
}

export function getChoiceQuesList(parameter) {
  return request({
    url: api.ChoiceQuesList,
    method: 'get',
    params: parameter,
  })
}

export function getSightsingingList(parameter) {
  return request({
    url: api.SightsingingList,
    method: 'get',
    params: parameter,
  })
}
export function getChoiceList(parameter) {
  return request({
    url: api.ChoiceList,
    method: 'get',
    params: parameter,
  })
}
export function getQuesGroupList(parameter) {
  return request({
    url: api.QuesGroupList,
    method: 'get',
    params: parameter,
  })
}

export function uploadChoiceAnswer(parameter) {
  return request({
    url: api.ChoiceRecord,
    method: 'post',
    data: parameter,
  })
}
export function uploadSightsingingAnswer(parameter) {
  return request({
    url: api.SightsingingRecord,
    method: 'post',
    data: parameter,
  })
}

export function uploadAudio(parameter) {
  return request({
    url: api.UploadAudio,
    method: 'post',
    data: parameter,
  })
}
