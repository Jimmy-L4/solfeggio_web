<template>
  <page-header-wrapper title="选择题作业详情" content="选择题作业详情页面">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-card :title="groupTitle" :bordered="false">
        <a-card class="questionCard" v-for="(item, index) in questionList" :key="0 + index">
          <div slot="title">
            <p>{{ item.ques_txt }}</p>

            <a-divider style="margin: 16px 0" />
            <!-- 题目信息 -->
            <img v-if="item.ques_pic_path" :width="800" :src="item.ques_pic_path" />
            <a-divider v-if="item.ques_pic_path" style="margin: 16px 0" />
            <!-- 题目音频 -->
            <my-player :src="item.ques_audio_path" :metroSrc="metroSrc(item)" />
          </div>
          <!-- 选项 -->
          <img :width="800" :src="item.userAnswer" />
        </a-card>
      </a-card>
    </a-card>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <p style="font-size: 10">本题组总得分为：{{ sumScore }}</p>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { getDictationQuesList } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

export default {
  name: 'DictationResult',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      metronome: this.$store.getters.metronome,
      questionList: [],
      part_id: '',
      sumScore: 0,
      fresh: true,
    }
  },
  beforeCreate() {
    if (!this.$route.params.part_id) {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  beforeMount() {
    if (this.$route.params.part_id) {
      this.part_id = this.$route.params.part_id
      this.sumScore = this.$route.params.sumScore
      console.log('首题part_id:', this.part_id)
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  mounted() {
    this.getQuestion()
  },
  computed: {
    groupTitle() {
      return this.questionList.length ? this.questionList[0]['L_ques_txt'] : ''
    },
    metroSrc() {
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
    getQuestion() {
      const parameter = { part_id: this.part_id, withAnswer: 1 }
      getDictationQuesList(parameter)
        .then((res) => {
          this.questionList = res
          console.log('题目列表', this.questionList)
        })
        .catch((e) => {
          console.error('获取听写题信息失败', e)
          notification.error({
            message: '获取听写题信息失败',
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
  height: auto;
}
.radioStyle {
  display: flex;
  margin-top: 12px;
}
.iframe_box {
  width: 100%;
  height: 400px;
}
</style>
