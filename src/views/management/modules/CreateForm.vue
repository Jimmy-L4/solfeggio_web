<template>
  <a-modal
    title="添加学生"
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
        <a-form-item label="学号">
          <a-input
            v-decorator="['studentId', { rules: [{ required: true, min: 8, message: '请输入至少六个字符的学号！' }] }]"
          />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input
            v-decorator="['studentName', { rules: [{ required: true, min: 1, message: '请输入正确输入姓名！' }] }]"
          />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-decorator="['gender', { rules: [{ required: true, message: '请选择班级！' }] }]">
            <a-radio value="0">女</a-radio>
            <a-radio value="1">男</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="班级">
          <a-select
            placeholder="请选择"
            v-decorator="['class', { rules: [{ required: true, message: '请选择班级！' }] }]"
          >
            <a-select-option value="0">20民乐班</a-select-option>
            <a-select-option value="1">20作曲班</a-select-option>
            <a-select-option value="2">21管乐、音教班</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="等级">
          <a-select
            placeholder="请选择"
            v-decorator="['grade', { rules: [{ required: true, message: '请选择等级！' }] }]"
          >
            <a-select-option value="0">基础级</a-select-option>
            <a-select-option value="1">一级</a-select-option>
            <a-select-option value="2">二级</a-select-option>
            <a-select-option value="3">三级</a-select-option>
            <a-select-option value="4">四级</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="课程名称">
          <a-input v-decorator="['courseName', { rules: [{ required: true, message: '请输入课程名称！' }] }]" />
        </a-form-item>
        <a-form-item label="专业">
          <a-input v-decorator="['major', { rules: [{ required: true, message: '请输入专业！' }] }]" />
        </a-form-item>
        <a-form-item label="修读方式">
          <a-select
            placeholder="请选择"
            v-decorator="['studyMode', { rules: [{ required: true, message: '请选择修读方式！' }] }]"
          >
            <a-select-option value="0">正常修读</a-select-option>
            <a-select-option value="1">重修</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
// 表单字段
const fields = ['studentName', 'studentId', 'gender', 'class', 'grade', 'courseName', 'major', 'studyMode']

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
    // 防止表单未注册
    fields.forEach((v) => this.form.getFieldDecorator(v))
  },
}
</script>
