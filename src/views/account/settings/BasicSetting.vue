<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
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
                :defaultChecked="(metronomeSwitch === 'true' && true) || false"
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
      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import { TOGGLE_METRONOME } from '@/store/mutation-types'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal,
  },
  data() {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1],
      },
      metronomeSwitch: this.$store.metronome,
    }
  },
  methods: {
    setavatar(url) {
      this.option.img = url
    },
    onChange(checked) {
      this.$store.commit(TOGGLE_METRONOME, checked)
    },
    validate(){


    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
