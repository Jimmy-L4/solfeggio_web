<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="3" :md="12" :sm="24">
        <a-form-item label="学习模式">
          <a-radio-group v-decorator="['learningMode', { rules: [{ required: true, message: '请选择学习模式' }] }]">
            <a-radio-button value="0">视唱</a-radio-button>
            <a-radio-button value="3">练耳</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="15" :md="12" :sm="24">
        <a-form-item label="课次选择">
          <a-radio-group :defaultValue="lesson_No" v-model:value="lesson_No">
            <a-radio-button value="1">课次一</a-radio-button>
            <a-radio-button value="2">课次二</a-radio-button>
            <a-radio-button value="3">课次三</a-radio-button>
            <a-radio-button value="4">课次四</a-radio-button>
            <a-radio-button value="5">课次五</a-radio-button>
            <a-radio-button value="6">课次六</a-radio-button>
            <a-radio-button value="7">课次七</a-radio-button>
            <a-radio-button value="8">课次八</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="题目等级">
          <a-select
            placeholder="请选择题目等级"
            v-decorator="['grade', { rules: [{ required: true, message: '请选择题目等级' }] }]"
          >
            <a-select-option value="0">基础级</a-select-option>
            <a-select-option value="1">一级</a-select-option>
            <a-select-option value="2">二级</a-select-option>
            <a-select-option value="3">三级</a-select-option>
            <a-select-option value="4">四级</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="题目序号">
          <a-select
            placeholder="请选择题目序号"
            v-decorator="['questionList', { rules: [{ required: true, message: '请选择题目序号' }] }]"
          >
            <a-select-option value="1">单声部视谱即唱</a-select-option>
            <a-select-option value="2">单声部精唱</a-select-option>
            <a-select-option value="3">双声部</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit">查询</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'SelectionBox',
  props: {
    showSubmit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
      lesson_No: this.$store.getters.lesson_No,
      learningMode: 0,
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: JSON.stringify(values),
          })
        }
      })
    },
  },
}
</script>

<style scoped></style>
