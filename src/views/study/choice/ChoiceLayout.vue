<template>
  <page-header-wrapper title="选择题页面" content="选择题页面">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-card title="一、音阶(每题3分,共18分)" :bordered="false">
        <a-card class="questionCard" v-for="(item, index) in questionList" :key="index">
          <div slot="title">
            {{ item.ques_txt }}
            <a-divider style="margin: 16px 0" />
            <!-- 题目信息 -->
            <img v-if="item.ques_pic_path" :width="500" :src="global_url + item.ques_pic_path" />
            <a-divider v-if="item.ques_pic_path" style="margin: 16px 0" />
            <!-- 题目音频 -->
            <audio-player :src="global_url + item.ques_audio_path" />
          </div>
          <!-- 选项 -->
          <a-radio-group v-model:value="item.userAnswer" @change="handleChange()">
            <a-radio class="radioStyle" :value="inx" v-for="(answer, inx) in item.answer" :key="index">
              <a-card hoverable :bordered="item.userAnswer == inx">
                <!-- 选项图片 -->
                <template #cover> <img alt="练耳选择题题目" :src="global_url + answer.pic_path" /> </template>
                <!-- 选项文字 -->
                <a-card-meta :description="inx.toUpperCase() + ':   ' + answer.txt"> </a-card-meta>
              </a-card>
            </a-radio>
          </a-radio-group>
        </a-card>
      </a-card>
    </a-card>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <a-button type="primary" @click="handleSubmit" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { getChoiceQuesList } from '@/api/manage'

export default {
  name: 'ChoiceLayout',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      questionList: [],
      loading: false,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    // handler
    handleSubmit(e) {
      console.log(e)
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handleChange(e) {
      console.log(this.questionList)
    },
    getQuestion() {
      const parameter = { part_id: '301000000000000010101' }
      getChoiceQuesList(parameter).then((res) => {
        this.questionList = res
        console.log(this.questionList)
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
}
</style>
