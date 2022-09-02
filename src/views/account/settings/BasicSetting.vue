<template>
  <div class="account-settings-info-view" style="width: 50%">
    <a-list>
      <!-- 节拍器与标准音开关 -->
      <a-list-item>
        <a-list-item-meta>
          <template v-slot:title>
            <a>节拍器与标准音</a>
          </template>
          <template v-slot:description>
            <span> 练耳选择题播放题目前是否播放节拍器与标准音 </span>
          </template>
        </a-list-item-meta>
        <template v-slot:actions>
          <a-switch checkedChildren="开启" unCheckedChildren="关闭" :defaultChecked="metronomeSwitch" @change="onChange" />
        </template>
      </a-list-item>

    </a-list>
    <a-form layout="vertical">
      <a-form-item label="管理员等级" v-if="userInfo.is_superuser">
        <a-select placeholder="请选择要切换的等级">
          <a-select-option value="0">基础级</a-select-option>
          <a-select-option value="1">一级</a-select-option>
          <a-select-option value="2">二级</a-select-option>
          <a-select-option value="3">三级</a-select-option>
          <a-select-option value="4">四级</a-select-option>
        </a-select>
        <a-button type="primary" @click="validate" style="margin-top:12px ;">更新等级</a-button>
      </a-form-item>
    </a-form>

    <a-form layout="horizontal">
      <a-form-item name="password" label="旧密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-input v-model="form.password" placeholder="请输入旧密码" type="password"></a-input>
      </a-form-item>
      <a-form-item name="newPassword" label="新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-input v-model="form.newPassword" placeholder="请输入新密码" type="password"></a-input>
      </a-form-item>
      <a-form-item name="checkPassword" label="确认新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-input v-model="form.checkPassword" placeholder="请再次输入新密码" type="password"></a-input>
      </a-form-item>
      <div class="modal-button">
        <a-button type="dashed" @click="resetEdit()">重置输入</a-button>
        <a-button type="primary" @click="submitEdit()" style="margin-left:12px">更新密码</a-button>
      </div>
    </a-form>

  </div>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import { TOGGLE_METRONOME } from '@/store/mutation-types'
import { updateUserInfo } from '@/api/login'
import { changePass } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

export default {
  mixins: [baseMixin],
  components: {},
  data() {
    return {
      metronomeSwitch: this.$store.getters.metronome,
      userInfo: this.$store.getters.userInfo,
      form: {
        password: '',
        newPassword: '',
        checkPassword: ''
      }

    }
  },
  mounted() { },
  methods: {
    onChange(checked) {
      this.$store.commit(TOGGLE_METRONOME, checked)
      const paramter = { metronome: checked }
      updateUserInfo(paramter)
        .then((res) => {
          notification.success({
            message: '更新设置成功',
            description: '节拍器和标准音开关：' + checked,
          })
        })
        .catch((e) => {
          console.error('更新设置失败', e)
          notification.error({
            message: '更新设置失败',
            description: '',
          })
        })
    },
    validate() { },
    // 修改密码
    submitEdit() {
      if (this.form.password == '' || this.form.newPassword == '' || this.form.checkPassword == '') {
        notification.error({
          message: '密码设置失败',
          description: '请先输入密码！',
        })
      } else if (this.form.password == this.form.newPassword) {
        notification.error({
          message: '密码设置失败',
          description: '新密码与旧密码不能相同！',
        })

      } else if (this.form.newPassword != this.form.checkPassword) {
        notification.error({
          message: '密码设置失败',
          description: '两次输入的新密码不相同！',
        })
      } else if (this.form.newPassword.length < 8) {
        notification.error({
          message: '密码设置失败',
          description: '密码至少包含8位！',
        })
      } else {
        console.log(this.form);
        const parameter = { password: this.form.password, newPassword: this.form.newPassword }
        changePass(parameter)
          .then((res) => {
            console.log(res)
            console.log('设置密码成功', res)
            notification.success({
              message: '设置密码成功',
              description: res,
            })
            this.resetEdit()
            this.$store.dispatch('Logout').then(() => {
              this.$router.push({ name: 'login' })
            })
          })
          .catch((e) => {
            console.error('设置密码失败', e)
            notification.error({
              message: '设置密码失败',
              description: e,
            })
          })


      }

    },
    // 重置修改密码
    resetEdit() {
      this.form = {
        password: '',
        newPassword: '',
        checkPassword: ''
      }
    },

  },
}
</script>

<style lang="less" scoped>
</style>
