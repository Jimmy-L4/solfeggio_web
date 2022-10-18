<template>
  <div class="main">
    <a-form id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit">
      <a-tabs :activeKey="customActiveKey"
              :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
              @change="handleTabClick">
        <!-- 账号密码登录 -->
        <a-tab-pane key="tab1"
                    :tab="$t('user.login.tab-login-credentials')">
          <a-alert v-if="isLoginError"
                   type="error"
                   showIcon
                   style="margin-bottom: 24px"
                   :message="$t('user.login.message-invalid-credentials')" />
          <a-form-item>
            <a-input size="large"
                     type="text"
                     :placeholder="$t('user.login.username.placeholder')"
                     v-decorator="[
                'username',
                {
                  rules: [
                    { required: true, message: $t('user.userName.required') },
                    { validator: handleUsernameOrEmail },
                  ],
                  validateTrigger: 'change',
                },
              ]">
              <a-icon slot="prefix"
                      type="user"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password size="large"
                              :placeholder="$t('user.login.password.placeholder')"
                              v-decorator="[
                'password',
                { rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur' },
              ]">
              <a-icon slot="prefix"
                      type="lock"
                      :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>

        <!-- modify by 李崇明 20220402 -->
        <!-- 暂时不开启手机号登录功能 -->
        <!-- <a-tab-pane key="tab2" :tab="$t('user.login.tab-login-mobile')">
          <a-form-item>
            <a-input size="large" type="text" :placeholder="$t('user.login.mobile.placeholder')" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: $t('user.login.mobile.placeholder') }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" :placeholder="$t('user.login.mobile.verification-code.placeholder')" v-decorator="['captcha', {rules: [{ required: true, message: $t('user.verification-code.required') }], validateTrigger: 'blur'}]">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && $t('user.register.get-verification-code') || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane> -->
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">{{
          $t('user.login.remember-me')
        }}</a-checkbox>

        <!-- modify by 李崇明 20220402 -->
        <!-- 暂时不开启忘记密码功能 -->
        <!-- <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >{{ $t('user.login.forgot-password') }}</router-link> -->
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button size="large"
                  type="primary"
                  htmlType="submit"
                  class="login-button"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn"> 登录 </a-button>
        <a-button size="large"
                  type="primary"
                  class="login-button"
                  @click="activate"> 账号激活 </a-button>
      </a-form-item>

      <!-- modify by 李崇明 20220402 -->
      <!-- 暂时不开启其他方式登录功能 -->
      <!-- <div class="user-login-other">
        <span>{{ $t('user.login.sign-in-with') }}</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">{{ $t('user.login.signup') }}</router-link>
      </div> -->
    </a-form>

    <two-step-captcha v-if="requiredTwoStepCaptcha"
                      :visible="stepCaptchaVisible"
                      @success="stepCaptchaSuccess"
                      @cancel="stepCaptchaCancel"></two-step-captcha>

    <!-- 激活窗口 -->
    <a-modal v-model:visible="modelVisible"
             title="账户激活"
             :confirm-loading="confirmLoading"
             :okText="verifiable? '确定':'验证'"
             @ok="handleOk"
             @cancel="handleCancel"
             :destroyOnClose="true">
      <a-form>
        <a-form-item style="width:88%"
                     v-if="!verifiable"
                     label="请输入你的学号及验证码">
          <a-input v-model:value="studentId"
                   placeholder="请输入学号" />
          <a-input v-model:value="verificationCode"
                   placeholder="请输入验证码,并进行验证">
          </a-input>
        </a-form-item>

        <a-form-item v-if="verifiable"
                     name="password"
                     style="width:88%"
                     label="设置密码">
          <a-input-password v-model="password.newPassword"
                            placeholder="请输入新密码"
                            type="password"></a-input-password>
          <div>重新输入新密码：</div>
          <a-input-password v-model="password.checkPassword"
                            placeholder="请再次输入新密码"
                            type="password"></a-input-password>
        </a-form-item>
      </a-form>

    </a-modal>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { setPass, verifyCode, getSmsCaptcha, get2step } from '@/api/login'
import { notification } from 'ant-design-vue'

export default {
  components: {
    TwoStepCaptcha,
  },
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false,
      },
      modelVisible: false,
      confirmLoading: false,
      studentId: '',
      verificationCode: '',
      verifiable: false,
      password: {
        newPassword: '',
        checkPassword: ''
      }

    }
  },
  created () {
    // get2step({})
    //   .then((res) => {
    //     this.requiredTwoStepCaptcha = res.result.stepCode
    //   })
    //   .catch(() => {
    //     this.requiredTwoStepCaptcha = false
    //   })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login,
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          // loginParams.password = md5(values.password)
          loginParams.password = values.password
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then((res) => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8,
              })
            })
            .catch((err) => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess (res) {
      console.log(res)
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4,
      })
    },
    activate () {
      console.log("激活账户");
      this.modelVisible = true;
    },
    handleOk () {
      if (!this.verifiable) {
        this.verify()
      } else {
        this.submitPassword()
      }
    },
    handleCancel () {
      // 清空状态
      this.modelVisible = false
      this.studentId = ''
      this.verificationCode = ''
      this.verifiable = false,
        this.password = {
          newPassword: '',
          checkPassword: ''
        }
    },
    verify () {
      if (this.studentId == '') {
        console.log("学号为空");
        this.$notification['error']({
          message: '错误',
          description: '请先输入学号再进行验证！',
          duration: 6,
        })
      } else if (this.verificationCode == '') {
        console.log("验证码为空");
        this.$notification['error']({
          message: '错误',
          description: '请先输入验证码再进行验证！',
          duration: 6,
        })
      } else {
        const parameter = { studentId: this.studentId, verificationCode: this.verificationCode }
        verifyCode(parameter)
          .then((res) => {
            console.log(res)
            console.log('验证码验证通过，请设置账号密码')
            notification.success({
              message: '验证通过',
              description: res,
            })
            this.verifiable = true
          })
          .catch((e) => {
            console.error('验证失败', e)
            notification.error({
              message: '验证失败',
              description: e.response.data,
            })
          })
      }
    },
    // 设置密码
    submitPassword () {
      if (this.password.checkPassword == '' || this.password.newPassword == '') {
        notification.error({
          message: '密码设置失败',
          description: '请先输入密码！',
        })

      } else if (this.password.newPassword != this.password.checkPassword) {
        notification.error({
          message: '密码设置失败',
          description: '两次输入的新密码不相同！',
        })
      } else if (this.password.newPassword.length < 8) {
        notification.error({
          message: '密码设置失败',
          description: '密码至少包含8位！',
        })
      } else {
        console.log(this.password)
        const parameter = { studentId: this.studentId, newPassword: this.password.newPassword }
        setPass(parameter)
          .then((res) => {
            console.log(res)
            notification.success({
              message: '设置成功',
              description: res,
            })
            this.handleCancel()

          })
          .catch((e) => {
            console.error('设置密码失败', e)
            notification.error({
              message: '设置失败',
              description: e,
            })
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    margin-top: 10px;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
