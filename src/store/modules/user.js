import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, TOGGLE_METRONOME, TOGGLE_LESSON_No } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    // 练耳选择题节拍器开关
    metronome: false,
    // 课次
    lesson_No: '1',
    // 开放课次
    validLessons: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    [TOGGLE_METRONOME]: (state, mode) => {
      state.metronome = mode
      state.info.metronome = mode
    },
    [TOGGLE_LESSON_No]: (state, mode) => {
      state.lesson_No = mode
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            const result = response
            storage.set(ACCESS_TOKEN, result.access, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.access)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response) => {
            const result = response.result

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map((per) => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map((action) => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map((permission) => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)
            commit(TOGGLE_LESSON_No, result.lesson_No)
            commit(TOGGLE_METRONOME, result.metronome)

            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            storage.remove(ACCESS_TOKEN)
            resolve()
          })
          .catch((err) => {
            console.log('logout fail:', err)
            // resolve()
          })
          .finally(() => {})
      })
    },
  },
}

export default user
