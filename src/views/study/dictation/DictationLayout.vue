<template>
  <page-header-wrapper title="听写题答题卡" content="听写题答题卡">
    <a-card :title="groupTitle" :bordered="false">
      <a-card
        :body-style="{ padding: '24px 32px', height: '700px' }"
        v-for="(item, index) in questionList.slice(current - 1, current)"
        :key="0 + index"
      >
        <div slot="title">
          {{ item.ques_txt }}
          <a-divider style="margin: 16px 0" />
          <!-- 题目信息 -->
          <img v-if="item.ques_pic_path" :width="500" :src="global_url + item.ques_pic_path" />
          <a-divider v-if="item.ques_pic_path" style="margin: 16px 0" />
          <!-- 题目音频 -->
          <my-player
            :src="global_url + item.ques_audio_path"
            :metroSrc="global_url + 'library/metronome/' + item.note + '_' + item.beat + '_' + item.bpm + '.mp3'"
          />
          <a-divider style="margin: 16px 0" />
          <!-- <a-pagination v-model:current="current" show-less-items :total="questionList.length * 10" /> -->
          <a-steps :current="current - 1">
            <a-step v-for="(item, index) in questionList" :title="'第' + (index + 1) + '题'" :key="1 + index" />
          </a-steps>
        </div>
        <!-- 选项 -->
        <iframe
          class="iframe_box"
          name="myLeadsheet"
          src="/leadsheet/samples/simpleInterface/interface.html"
          frameborder="0"
          scrolling="auto"
        ></iframe>
      </a-card>
    </a-card>

    <footer-tool-bar>
      <a-button type="primary" @click="handleSubmit" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { getChoiceQuesList, uploadChoiceAnswer } from '@/api/manage'

export default {
  name: 'DictationLayout',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      loading: false,
      questionList: [],
      current: 1,
    }
  },
  computed: {
    groupTitle() {
      return this.questionList.length ? this.questionList[0]['L_ques_txt'] : ''
    },
  },
  methods: {
    // handler
    handleSubmit() {
      if (this.questionList.length == this.current) {
        this.$router.push({ name: 'dictation-list', params: {} })
      }
      this.current += 1
    },
    handleChange(e) {
      console.log('22', this.questionList)
    },
    handleMessage(e) {
      const data = e.data
      console.log(data)
      if (data.cmd == 'submitWork') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$message.info('作业提交成功!')
          this.$router.push({ name: 'dictation-list', params: {} })
        }, 1000)
      }
    },
    getQuestion() {
      const parameter = { part_id: '301000000000000020201' }
      getChoiceQuesList(parameter)
        .then((res) => {
          this.questionList = res
          console.log('题目列表', this.questionList)
        })
        .catch((e) => {
          console.error('获取选择题信息失败', e)
          notification.error({
            message: '获取选择题信息失败',
            description: e.response.data,
          })
        })
    },
  },
  mounted() {
    this.getQuestion()
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    window.addEventListener('message', this.handleMessage)
  },
}
</script>
<style lang="less" scoped>
.iframe_box {
  width: 100%;
  height: 100%;
}
</style>
