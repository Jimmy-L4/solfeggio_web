<template>
  <a-form class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="3" :md="12" :sm="24">
        <a-form-item label="学习模式">
          <a-radio-group v-model:value="queryParam.learningMode">
            <a-radio-button value="0">视唱</a-radio-button>
            <!-- <a-radio-button value="3">练耳</a-radio-button> -->
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="15" :md="12" :sm="24">
        <a-form-item label="课次选择">
          <a-radio-group v-model:value="queryParam.lesson_No">
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
          <a-select v-model:value="queryParam.grade">
            <a-select-option value="01">基础级</a-select-option>
            <a-select-option value="02">一级</a-select-option>
            <a-select-option value="03">二级</a-select-option>
            <a-select-option value="04">三级</a-select-option>
            <a-select-option value="05">四级</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item label="题目序号">
          <a-select placeholder="请选择题目序号" v-model:value="queryParam.questionNum">
            <a-select-option :key="item.key" v-for="item in projects[queryParam.learningMode]" :value="item.key">{{
                item.value
            }}
            </a-select-option>

          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button @click="handleSubmit">查询</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { getPartId } from '@/utils/util'
import { getSingDetail } from '@/api/manage'

import notification from 'ant-design-vue/es/notification'

const projects = {
  0: [{ key: '01', value: '单声部视谱即唱' }, { key: '02', value: '单声部精唱' }, { key: '03', value: '双声部' }],

  3: [{ key: '01', value: '音阶' }, { key: '02', value: '音组' }, { key: '03', value: '音程' },
  { key: '04', value: '和弦' }, { key: '05', value: '节奏' }, { key: '06', value: '单声部旋律' }, { key: '07', value: '双声部旋律' }]
}
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
      projects,
      queryParam: {
        learningMode: '0',
        lesson_No: '1',
        grade: '02',
        questionNum: '01'
      },
      questionDetail: {}
    }
  },
  methods: {
    handleSubmit() {
      let part_id
      // 分开获取part_id是因为练耳题目最后的序号不是01(包含多道题)
      if (this.queryParam.learningMode == '0') {
        part_id = this.getSingPartId()
      } else {
        part_id = this.getEarPartId()
      }
      const parameter = { 'part_id': part_id }
      getSingDetail(parameter)
        .then((res) => {
          this.questionDetail = res.result
          this.$emit("info", res.result, part_id, this.queryParam.grade)
        })
        .catch((err) => {
          console.error('获取题目信息失败', err)
          notification.error({
            message: '获取题目信息失败',
            description: '',
          })

        })


    },
    getSingPartId() {
      const part_id = getPartId(this.queryParam.learningMode, this.queryParam.questionNum, '00', this.queryParam.grade, this.queryParam.lesson_No, '01')
      return part_id
    },
    getEarPartId() {
      return

    },
    handlePartId(part_id) {
      this.queryParam.learningMode = part_id.charAt(0)
      this.queryParam.questionNum = '0' + part_id.charAt(2)
      this.queryParam.grade = '0' + part_id.charAt(16)
      this.queryParam.lesson_No = part_id.charAt(18)
      this.handleSubmit()

    }
  },
}
</script>

<style scoped>

</style>
