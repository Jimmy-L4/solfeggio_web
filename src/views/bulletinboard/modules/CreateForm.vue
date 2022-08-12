<template>
  <a-modal
    title="新建通知"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="
      () => {
        $emit('ok')
      }
    "
    @cancel="
      () => {
        $emit('cancel')
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="通知ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="通知名称">
          <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入通知名称' }] }]" />
        </a-form-item>

        <a-form-item label="通知面向班级">
          <a-select
            placeholder="请选择此通知面向班级"
            v-decorator="['class', { rules: [{ required: true, message: '请选择此通知面向班级' }] }]"
          >
            <a-select-option value="所有班级">所有班级</a-select-option>
            <a-select-option value="21级管乐班">21级管乐班</a-select-option>
            <a-select-option value="21级弦乐班">21级弦乐班</a-select-option>
            <a-select-option value="21级作曲班">21级作曲班</a-select-option>
            <a-select-option value="20英才器乐">20英才器乐</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="通知内容">
          <a-textarea
            v-decorator="['content', { rules: [{ required: true, message: '请输入通知内容' }] }]"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'title', 'class', 'content']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    model: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
    }
    return {
      form: this.$form.createForm(this),
    }
  },
  created() {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach((v) => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
}
</script>
