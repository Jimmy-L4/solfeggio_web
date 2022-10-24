<template>
  <page-header-wrapper title="选择题页面" content="选择题页面">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-card :title="groupTitle" :bordered="false">
        <a-card class="questionCard" v-for="(item, index) in questionList" :key="0 + index">
          <div slot="title">
            {{ item.ques_txt }}
            <a-divider style="margin: 16px 0" />
            <!-- 题目信息 -->
            <img v-if="item.ques_pic_path" :width="500" :src="item.ques_pic_path" />
            <a-divider v-if="item.ques_pic_path" style="margin: 16px 0" />
            <!-- 题目音频 -->
            <my-player :src="item.ques_audio_path" :metroSrc="metroSrc(item)" />
          </div>
          <!-- 选项 -->
          <a-radio-group v-model:value="item.userAnswer" @change="handleChange()" buttonStyle="solid">
            <a-radio-button class="radioStyle" :value="inx" v-for="(answer, inx) in item.answer" :key="inx" hoverable>
              <!-- 选项文字 -->
              {{answer.txt ? inx.toUpperCase() + ': ' + answer.txt : inx.toUpperCase()+'.'}}
              <a-card style="margin-bottom:8px">
                <!-- 选项图片 -->
                <template #cover>
                  <img style=" text-align: center" alt="练耳选择题题目" :src="answer.pic_path" />
                </template>
              </a-card>
            </a-radio-button>
          </a-radio-group>
        </a-card>
      </a-card>
    </a-card>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <a-tooltip placement="topRight" v-if="statusMap[state].disabled">
        <template #title>
          <span>{{ statusMap[state].text }}</span>
        </template>
        <a-button :disabled="true" type="primary" :loading="loading" style="margin-left: 20px">提交</a-button>
      </a-tooltip>
      <a-popconfirm v-else title="确认提交作业吗？提交后将无法修改！" @confirm="handleSubmit" @cancel="cancelSubmit">
        <a-button type="primary" :loading="loading">提交</a-button>
      </a-popconfirm>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { getChoiceQuesList, uploadChoiceAnswer } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

const statusMap = {
  0: {
    disabled: false,
    text: '待完成',
  },
  1: {
    disabled: true,
    text: '作业已完成，无法再次提交！',
  },
  2: {
    disabled: true,
    text: '作业已逾期，无法再进行提交！',
  },
}

export default {
  name: 'ChoiceLayout',
  components: {
    FooterToolBar,
  },
  data () {
    return {
      statusMap,
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      questionList: [],
      loading: false,
      part_id: '',
      state: 0,
      userInfo: this.$store.getters.userInfo,
      metronome: this.$store.getters.metronome,
    }
  },
  beforeCreate () {
    if (!this.$route.params.part_id) {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  beforeMount () {
    if (this.$route.params.part_id) {
      this.part_id = this.$route.params.part_id
      this.state = this.$route.params.state
      console.log('首题part_id:', this.part_id)
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
    this.getQuestion()
  },
  mounted () { },
  computed: {
    groupTitle () {
      return this.questionList.length ? this.questionList[0]['L_ques_txt'] : ''
    },
    metroSrc () {
      return (item) => {
        if (this.metronome) {
          return '/library/metronome/' + item.note + '_' + item.beat + '_' + item.bpm + '.mp3'
        } else {
          return ''
        }
      }
    },
  },
  methods: {
    // handler
    handleSubmit (e) {
      console.log(e)
      this.loading = true
      var inVaild = this.checkAnswer()
      if (inVaild != '') {
        notification.error({
          message: '第' + inVaild.substring(0, inVaild.length - 1) + '题没有选择答案，请选择答案后再提交！',
        })
        this.loading = false
        return
      }
      this.uploadAnswer()
    },
    checkAnswer () {
      var i = 0
      var inVaild = ''
      for (i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].userAnswer == -1) {
          inVaild += i + 1 + '、'
        }
      }
      console.log(inVaild)
      return inVaild
    },
    uploadAnswer () {
      const answerInfo = []
      this.questionList.forEach((ques) => {
        var data = { part_id: ques.part_id, userAnswer: ques.userAnswer }
        answerInfo.push(data)
      })
      const parameter = {
        answerInfo: answerInfo,
        lesson_No: this.part_id.charAt(18),
        groupPart_id: this.part_id.substring(0, this.part_id.length - 2),
      }
      console.log(parameter)
      uploadChoiceAnswer(parameter)
        .then((res) => {
          console.log(res)
          notification.success({
            message: '上传作业成功',
            description: '在个人中心中查看提交详情！',
          })
          this.loading = false
          this.$router.push({ name: 'choice-list', replace: true, params: { lesson_No: this.part_id.charAt(18) } })
        })
        .catch((err) => {
          console.error('错误', err)
          notification.error({
            message: '上传答案失败',
            description: '',
          })
        })
    },
    cancelSubmit () {
      console.log('用户取消了提交作业')
    },
    handleChange (e) {
      console.log(this.questionList)
    },
    getQuestion () {
      const parameter = { part_id: this.part_id, withAnswer: 0 }
      getChoiceQuesList(parameter)
        .then((res) => {
          this.questionList = res
          console.log('题目列表', this.questionList)
        })
        .catch((e) => {
          console.error('获取选择题信息失败', e)
          notification.error({
            message: '获取选择题信息失败',
            description: '',
          })
        })
    },
  },
}
</script>
<style lang="less" scoped>
.questionCard {
  margin-top: 12px;
}

.radioStyle {
  display: flex;
  margin-top: 12px;
  height: auto;
}
</style>
