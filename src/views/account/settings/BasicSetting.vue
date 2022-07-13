<template>
  <div class="account-settings-info-view">
    <a-form layout="vertical">
      <a-form-item :label="$t('account.settings.basic.nickname')">
        <a-input :placeholder="$t('account.settings.basic.nickname-message')" />
      </a-form-item>

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
          <a-switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            :defaultChecked="metronomeSwitch"
            @change="onChange"
          />
        </template>
      </a-list-item>
      <a-form-item label="管理员等级">
        <a-select
          placeholder="请选择要切换的等级"
          v-decorator="['grade', { rules: [{ required: true, message: '请选择管理员' }] }]"
        >
          <a-select-option value="0">基础级</a-select-option>
          <a-select-option value="1">一级</a-select-option>
          <a-select-option value="2">二级</a-select-option>
          <a-select-option value="3">三级</a-select-option>
          <a-select-option value="4">四级</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="validate">更新等级</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import { TOGGLE_METRONOME } from '@/store/mutation-types'

export default {
  mixins: [baseMixin],
  components: {},
  data() {
    return {
      // cropper
      preview: {},
      metronomeSwitch: this.$store.getters.metronome,
    }
  },
  mounted() {},
  methods: {
    onChange(checked) {
      this.$store.commit(TOGGLE_METRONOME, checked)
    },
    validate() {},
  },
}
</script>

<style lang="less" scoped></style>
