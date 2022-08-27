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
          <a-descriptions-item v-if="quesType != 0" label="低声部">{{ lowPart }}</a-descriptions-item>
          <a-descriptions-item v-if="quesType != 0" label="高声部">{{ highPart }}</a-descriptions-item>
        </a-descriptions>
        <div style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500">
          <div>范例音:<audio-player style="margin-top: 12px" :src="quesDetail.audio_path" /></div>
          <div style="margin-top: 16px">节拍器:<audio-player style="margin-top: 12px" :src="metroSrc" /></div>
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
      dragToggle: true,
      quesDetail: {},
      sumScore: 0,
      cardLoad: true,
      quesType: 0,
      recordId: 0,
    }
  },
  computed: {
    metroSrc() {
      return (
        '/library/metronome/' + this.quesDetail.note + '_' + this.quesDetail.beat + '_' + this.quesDetail.bpm + '.mp3'
      )
    },
    lowPart() {
      return this.quesType == '1' ? this.quesDetail.user : this.quesDetail.coop_user
    },
    highPart() {
      return this.quesType == '2' ? this.quesDetail.user : this.quesDetail.coop_user
    },
  },
  beforeMount() {
    if (this.$route.params.part_id) {
      this.part_id = this.$route.params.part_id
      this.sumScore = this.$route.params.sumScore
      this.recordId = this.$route.params.recordId
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    getQuestion() {
      const parameter = { part_id: this.part_id, recordId: this.recordId }
      getSightsingingQuesList(parameter)
        .then((res) => {
          this.quesDetail = res.result
          this.quesType = res.result['quesType']
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
