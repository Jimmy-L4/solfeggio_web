<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title="false" content="批改页面用于批改学生作业">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-card type="inner" title="曲谱信息">
        <audio-player
          src="https://musicmuc.chimusic.net/solfeggio/library/All_audio_test/lv4_/lesson_4/sing/RRRR4SR_104.mp3"
        />
        <a-divider style="margin: 16px 0" />
        <img
          :width="800"
          src="https://musicmuc.chimusic.net/solfeggio/library/Autumn_semester_2024/13_%E8%AF%BE%E6%AC%A12_1_12_74.png"
        />
      </a-card>
      <a-card type="inner" title="学生提交" style="margin-top: 24px">
        <a-descriptions title="学生信息">
          <a-descriptions-item label="姓名">李崇明</a-descriptions-item>
          <a-descriptions-item label="学号">2021111708</a-descriptions-item>
          <a-descriptions-item label="班级">2021级作曲班</a-descriptions-item>
          <a-descriptions-item :label="submitText"></a-descriptions-item>
        </a-descriptions>
        <audio-player
          v-if="type"
          src="https://musicmuc.chimusic.net/solfeggio/library/All_audio_test/lv4_/lesson_4/sing/RRRR4SR_104.mp3"
        />
        <img
          v-else
          :width="800"
          src="https://musicmuc.chimusic.net/solfeggio/library/Autumn_semester_2024/13_%E8%AF%BE%E6%AC%A12_1_12_74.png"
        />
        <a-form name="成绩" @submit="handleSubmit" :form="form" style="margin-top: 24px">
          <a-row :gutter="24">
            <template v-for="(item, index) in factor">
              <a-col :span="4">
                <a-form-item :name="item" :label="item">
                  <a-input-number
                    @blur="averageScore"
                    :min="0"
                    :max="100"
                    v-decorator="[item, { rules: [{ required: true, message: '请输入分数' }] }]"
                  />
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
              <a-button style="margin: 0 8px" @click="() => form.resetFields()">清空</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'Correcting',
  data() {
    return {
      type: 1,
      form: this.$form.createForm(this),
      factor: ['流畅性', '速度', '音高', '节奏', '对齐', '和声'],
      formState: {},
      meanScore: 0,
    }
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onFinish(values) {
      console.log('Received values of form: ', values)
      console.log('formState: ', this.formState)
      console.log('AverageScore: ', this.AverageScore)
    },
    averageScore(e) {
      console.log(e)
      var formData = this.form.getFieldsValue()
      console.log(formData)
      var len = 0
      var total = 0
      for (var key in formData) {
        if (typeof formData[key] != 'undefined') {
          len += 1
          total += formData[key]
        }
      }
      if (len) {
        this.meanScore = (total / len).toFixed(2)
      } else {
        return
      }
    },
  },

  computed: {
    submitText() {
      if (this.type) {
        return '提交音频'
      } else {
        return '提交乐谱'
      }
    },
  },
}
</script>
