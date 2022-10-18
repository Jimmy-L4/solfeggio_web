import request from '@/utils/request'

const userApi = {
  Login: '/token/',
  Logout: '/user/logout/',
  verifyCode: '/user/verify_code/',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/userinfo/',
  UserMenu: '/user/nav/',
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter,
  })
}

export function setPass(parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'post',
    data: parameter,
  })
}

export function verifyCode(parameter) {
  return request({
    url: userApi.verifyCode,
    method: 'post',
    data: parameter,
  })
}


export function getSmsCaptcha(parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter,
  })
}

export function getInfo() {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
export function updateUserInfo(parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'put',
    data: parameter,
  })
}

export function getCurrentUserNav() {
  return request({
    url: userApi.UserMenu,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter,
  })
}
