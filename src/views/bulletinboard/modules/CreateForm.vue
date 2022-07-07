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
        <a-form-item label="通知名称" >
          <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入通知名称' }] }]" />
        </a-form-item>
        <a-form-item label="通知面向班级" >
          <a-select
            placeholder="请选择此通知面向班级"
            v-decorator="['class', { rules: [{ required: true, message: '请选择此通知面向班级' }] }]"
          >
            <a-select-option value="0">所有班级</a-select-option>
            <a-select-option value="1">21级管乐班</a-select-option>
            <a-select-option value="2">21级弦乐班</a-select-option>
            <a-select-option value="3">21级作曲班</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="通知内容" >
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
const fields = ['name', 'class', 'content']

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
