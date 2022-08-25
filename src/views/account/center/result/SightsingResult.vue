<template>
  <page-header-wrapper title="视唱题目页面" content="请根据要求录制对应曲目">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" :loading="cardLoad" v-if="!cardLoad">
      <a-card :bordered="false" :title="false">
        <a-descriptions title="基础信息">
          <a-descriptions-item label="歌曲名称">{{ quesDetail.audio_detail.audio_name }}</a-descriptions-item>
          <a-descriptions-item label="演奏者">{{ quesDetail.audio_detail.audio_player }}</a-descriptions-item>
          <a-descriptions-item></a-descriptions-item>
          <a-descriptions-item label="乐器">{{ quesDetail.audio_detail.audio_instrument }}</a-descriptions-item>
          <a-descriptions-item label="名族">{{ quesDetail.audio_detail.audio_nation }}</a-descriptions-item>
          <a-descriptions-item></a-descriptions-item>
        </a-descriptions>
        <div style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500">
          <div style="margin-bottom: 16px">范例音:<audio-player :src="quesDetail.audio_path" /></div>
          <div>节拍器:<audio-player :src="metroSrc" /></div>
        </div>

        <a-card type="inner" title="曲谱信息" style="margin-top: 24px">
          <img :width="800" :src="quesDetail.pic_path" />
        </a-card>
        <a-card type="inner" title="提交内容" style="margin-top: 24px">
          <audio-player :src="quesDetail.userAudio" />
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
import notification from 'ant-design-vue/es/notification'
import FooterToolBar from '@/components/FooterToolbar'
import { getSightsingingQuesList } from '@/api/manage'

export default {
  name: 'SightsingResult',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      baseFile_url: 'http://localhost:8000/media/',
      dragToggle: true,
      quesDetail: {},
      sumScore: 0,
      cardLoad: true,
    }
  },
  computed: {
    metroSrc() {
      return (
        '/library/metronome/' + this.quesDetail.note + '_' + this.quesDetail.beat + '_' + this.quesDetail.bpm + '.mp3'
      )
    },
  },
  beforeMount() {
    if (this.$route.params.part_id) {
      this.part_id = this.$route.params.part_id
      this.sumScore = this.$route.params.sumScore
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    getQuestion() {
      const parameter = { part_id: this.part_id }
      getSightsingingQuesList(parameter)
        .then((res) => {
          this.quesDetail = res.result
          this.cardLoad = false
          console.log('题目信息', this.quesDetail)
        })
        .catch((e) => {
          console.error('获取视唱信息失败', e)
          notification.error({
            message: '获取视唱信息失败',
            description: '',
          })
        })
    },
  },
}
</script>
<style lang="less" scoped></style>
