import request from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',

  commitList: '/manage/commitList',
  noticeList: '/notice/',

  ChoiceQuesList: '/question/choice/',
  DictationQuesList: '/question/dictation/',
  SightsingingQuesList: '/question/sightsinging/',
  SightsingingList: '/question/sightsinging_list/',
  ChoiceList: '/question/choice_list/',
  DictationList: '/question/dictation_list/',

  QuesGroupList: '/homework/quse_group/',
  ChoiceRecord: '/homework/choice/',
  SightsingingRecord: '/homework/sightsinging/',
  DictationRecord: '/homework/dictation/',

  UploadAudio: '/router/audio/',
  UploadJson: '/router/json/',
  UploadPNG: '/router/png/',

  studentInfo: '/user/student_info/',
  changePass:'/user/change_pass/',
  studentList: '/user/student_list/',
  // 教师批阅(workbench)
  SingDetail:'/workbench/sing_detail/', 
  CommitInfo:'/workbench/commit_info/',
  SingRecord:'/workbench/sing_record/'
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
// 获得学生信息
export function getStudentInfo(parameter) {
  return request({
    url: api.studentInfo,
    method: 'get',
    params: parameter,
  })
}
// 修改登录密码
export function changePass(parameter) {
  return request({
    url: api.changePass,
    method: 'post',
    data: parameter,
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
export function getDictationQuesList(parameter) {
  return request({
    url: api.DictationQuesList,
    method: 'get',
    params: parameter,
  })
}
export function getSightsingingQuesList(parameter) {
  return request({
    url: api.SightsingingQuesList,
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
export function getDictationList(parameter) {
  return request({
    url: api.DictationList,
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
export function uploadDictionAnswer(parameter) {
  return request({
    url: api.DictationRecord,
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
export function uploadJson(parameter) {
  return request({
    url: api.UploadJson,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
export function uploadPNG(parameter) {
  return request({
    url: api.UploadPNG,
    method: 'post',
    data: parameter,
  })
}
// 教师获取视唱题目
export function getSingDetail(parameter) {
  return request({
    url: api.SingDetail,
    method: 'get',
    params: parameter,
  })
}
// 教师获取指定part_id提交信息
export function getCommitInfo(parameter) {
  return request({
    url: api.CommitInfo,
    method: 'get',
    params: parameter,
  })
}
// 教师获取指定学生的提交信息
export function getSingRecord(parameter) {
  return request({
    url: api.SingRecord,
    method: 'get',
    params: parameter,
  })
}
// 教师提交视唱成绩
export function putSingRecord(parameter) {
  return request({
    url: api.SingRecord,
    method: 'put',
    data: parameter,
  })
}

