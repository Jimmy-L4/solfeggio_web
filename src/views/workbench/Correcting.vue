<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false" content="批改页面用于批改学生作业">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-card type="inner" title="曲谱信息">
        <audio-player style="margin-top: 12px" :src="questionDetail.audio_path" />
        <a-divider style="margin: 16px 0" />
        <a-card type="inner" title="曲谱信息" style="margin-top: 24px">
          <img style=" text-align: center" width="97%" :src="questionDetail.pic_path" />
        </a-card>
      </a-card>
      <a-card type="inner" :title="'学生提交(' + (index + 1) + '/' + commitList.length + ')'" style="margin-top: 24px"
        v-if="recordCard.audio">
        <a-descriptions title="学生信息">
          <a-descriptions-item label="姓名">{{ record.studentName }}</a-descriptions-item>
          <a-descriptions-item label="学号">{{ record.studentId }}</a-descriptions-item>
          <a-descriptions-item label="班级">{{ recordClass }}</a-descriptions-item>
          <a-descriptions-item v-if="quesType != 0" label="低声部">{{ lowPart }}</a-descriptions-item>
          <a-descriptions-item v-if="quesType != 0" label="高声部">{{ highPart }}</a-descriptions-item>
        </a-descriptions>
        <div>提交音频:
          <audio-player style="margin-top: 12px" :src="recordCard.audio" />
        </div>

        <a-form name="成绩" @submit="handleSubmit" :form="form" style="margin-top: 24px">
          <div style="font-size: medium;font-weight: bold;">评分(百分制)</div>
          <a-row :gutter="24">
            <template v-for="(val, key, index) in factor">
              <a-col :span="4">
                <a-form-item :name="key" :label="val">
                  <a-input-number @blur="averageScore" :min="0" :max="100"
                    v-decorator="[key, { rules: [{ required: true, message: '请输入分数' }] }]" />
                </a-form-item>
              </a-col>
            </template>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: right; font-weight: bolder">
              <a-descriptions>
                <a-descriptions-item label="最终成绩">{{ meanScore }}分</a-descriptions-item>
              </a-descriptions>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-button htmlType="submit" type="primary">批改</a-button>
              <a-button style="margin-left: 8px" @click="() => form.resetFields()">清空</a-button>
              <a-button style="margin-left: 8px" @click="switchCard()">下一位</a-button>
              <a-button style="margin-left: 8px" @click="back2workbench()">返回信息页</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" style="text-align: right">
              <a-tag style="margin: 12px 8px">
                Tips:点击批改后会自动跳转至题卡中下位同学
              </a-tag>
            </a-col>
          </a-row>

        </a-form>
      </a-card>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import notification from 'ant-design-vue/es/notification'
import { getSingRecord, putSingRecord } from '@/api/manage'
import pick from 'lodash.pick'

export default {
  name: 'Correcting',
  data() {
    return {
      quesType: 0,
      form: this.$form.createForm(this),
      factor: { fluency: '流畅性', speed: '速度', pitch: '音高', rhythm: '节奏' },
      formState: {},
      meanScore: 0,
      questionDetail: {},
      index: 0,
      record: {},
      commitList: [],
      recordCard: {},
      part_id: '',
      userInfo: this.$store.getters.userInfo,
    }
  },
  computed: {
    recordClass() {
      return this.userInfo.class_list.filter(item => item.id == this.record.class_id)[0].name
    },
    lowPart() {
      return this.quesType == '1' ? this.record.studentName : this.record.coop_user
    },
    highPart() {
      return this.quesType == '2' ? this.record.studentName : this.record.coop_user
    },
  },
  beforeMount() {
    if (this.$route.params.questionDetail) {
      this.questionDetail = this.$route.params.questionDetail
      this.index = this.$route.params.index
      this.commitList = this.$route.params.commitList
      this.record = this.commitList[this.index]
      this.part_id = this.$route.params.part_id
    } else {
      this.$router.push({ name: 'workbench', replace: true })
    }
  },
  mounted() {
    this.getRecord()
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.submitScore(values)
        }
      })
    },
    submitScore(values) {
      for (var key in values) {
        this.recordCard[key] = values[key]
      }
      // 计算均分
      this.averageScore()
      this.recordCard['teacher_score'] = this.meanScore

      putSingRecord(this.recordCard)
        .then(res => {
          console.log('更新成绩成功', res);
          notification.success({
            message: '批改成功',
            description: this.index == this.commitList.length - 1 ? '本组学生已批阅完成,请切换至下组学生' : '正在切换至下位学生',
          })
          this.switchCard()
        })
        .catch(err => {
          console.error(err);
        })
    },
    switchCard() {
      const length = this.commitList.length
      // 题目改完了
      if (this.index == length - 1) {
        this.back2workbench()
      } else {
        this.index += 1
        this.record = this.commitList[this.index]
        this.getRecord()
      }
    },
    back2workbench() {
      const parameter = { part_id: this.part_id }
      this.$router.push({ name: 'workbench', params: parameter })
    },
    averageScore() {
      var formData = this.form.getFieldsValue()
      var len = 0
      var total = 0
      for (var key in formData) {
        if (typeof formData[key] != 'undefined') {
          len += 1
          total += formData[key]
        }
      }
      if (len) {
        this.meanScore = parseInt(total / len)
      } else {
        return
      }
    },
    getRecord() {
      const parameter = { record_id: this.record.key }
      getSingRecord(parameter)
        .then((res) => {
          console.log(res.result);
          this.recordCard = res.result
          this.quesType = res.result.ques_type
          if (this.quesType != 0) {
            this.factor['alignment'] = '对齐'
            this.factor['chord'] = '和声'
          }
          this.setForm(res.result)
        })
        .catch((e) => {
          console.error('获取视唱记录失败', e)
          notification.error({
            message: '获取视唱记录失败',
            description: '',
          })
        })

    },
    setForm(result) {
      let newForm = pick(result, Object.keys(this.factor))
      console.log(newForm);
      // 这里需要添加延时是为了组件加载完成
      setTimeout(() => { // 添加延时操作
        this.form.setFieldsValue(newForm)
        // 计算均分
        this.averageScore()
      }, 100)


    }
  }

}
</script>
