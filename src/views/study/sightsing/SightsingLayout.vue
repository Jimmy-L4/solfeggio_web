<template>
  <page-header-wrapper title="视唱题目页面" content="请根据要求录制对应曲目">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
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
        <a-card>
          <div style="min-height: 250px">
            <my-recorder
              ref="content"
              :class="dragToggle ? 'staticRecorder' : 'fiedRecorder'"
              :attempts="5"
              :time="5"
              :start-record="startRecord"
              :stop-record="stopRecord"
              :getRecord="getRecord"
              :dragToggle="toggle"
            />
          </div>
        </a-card>
      </a-card>
    </a-card>
    <!-- fixed footer toolbar -->
    <footer-tool-bar>
      <a-button type="default" @click="downloadAudio">下载音频</a-button>
      <a-tooltip placement="topRight" v-if="statusMap[quesDetail.state].disabled">
        <template #title>
          <span>{{ statusMap[quesDetail.state].text }}</span>
        </template>
        <a-button :disabled="true" type="primary" :loading="loading" style="margin-left: 20px">提交</a-button>
      </a-tooltip>
      <a-popconfirm v-else title="确认提交作业吗？提交后将无法修改！" @confirm="startUpload">
        <a-button type="primary" :loading="loading" style="margin-left: 20px">提交</a-button>
      </a-popconfirm>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import notification from 'ant-design-vue/es/notification'
import FooterToolBar from '@/components/FooterToolbar'
import { uploadAudio, uploadSightsingingAnswer } from '@/api/manage'

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
  name: 'SightsingLayout',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      loading: false,
      dragToggle: true,
      token: this.$store.getters.token,
      userInfo: this.$store.getters.userInfo,
      quesDetail: {},
      record: {},
      coopStudentInfo: {},
      voicePart: '',
      statusMap,
    }
  },
  computed: {
    headers() {
      return {
        Authorization: 'Bearer ' + this.token,
      }
    },
    metroSrc() {
      return (
        '/library/metronome/' + this.quesDetail.note + '_' + this.quesDetail.beat + '_' + this.quesDetail.bpm + '.mp3'
      )
    },
    // 单声部为0，低声部为1，高声部为2
    quesType() {
      const typeMap = {
        '': 0,
        低声部: 1,
        高声部: 2,
      }
      console.log(typeMap[this.voicePart])
      return typeMap[this.voicePart]
    },

    lowPart() {
      return this.quesType == '1' ? this.userInfo.name : this.coopStudentInfo.name
    },
    highPart() {
      return this.quesType == '2' ? this.userInfo.name : this.coopStudentInfo.name
    },
  },
  beforeMount() {
    if (this.$route.params.quesDetail) {
      this.quesDetail = this.$route.params.quesDetail
      console.log('题目信息：', this.quesDetail)
      if ('coopStudentInfo' in this.$route.params) {
        this.coopStudentInfo = this.$route.params.coopStudentInfo
        this.voicePart = this.$route.params.voicePart
      }
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  mounted() {
    this.draggable(this.$refs.content.$el)
  },
  methods: {
    startRecord(e) {
      notification.success({
        message: '开始录制音频',
        description: '',
      })
    },
    stopRecord(e) {
      notification.success({
        message: '结束录制音频',
        description: '',
      })
    },
    getRecord(record) {
      this.record = record
      console.log('被选中的音频为：', this.record)
    },
    startUpload() {
      if (!this.record.url) {
        notification.error({
          message: '请选择音频后再进行上传！',
        })
        return
      }
      this.loading = true
      let data = new FormData()
      data.append('content', this.record.blob, this.quesDetail.part_id + '-' + this.userInfo.user.toString() + '.wav')
      data.append('part_id', this.quesDetail.part_id)
      data.append('user', this.userInfo.user)
      uploadAudio(data)
        .then((res) => {
          console.log(res)
          this.submitHomework(res)
        })
        .catch((err) => {
          console.error(err)
          notification.error({
            message: '音频上传失败',
          })
          this.loading = false
        })
    },
    submitHomework(res) {
      let parameter = {
        part_id: this.quesDetail.part_id,
        audio: res.content.replace('http://127.0.0.1:8000', ''),
        user: this.userInfo.user,
        quesType: this.quesType,
      }
      // 双声部有合作者
      if (this.quesType != '0') {
        parameter['coopStudentInfo'] = this.coopStudentInfo
      }
      console.log(parameter)
      uploadSightsingingAnswer(parameter)
        .then((res) => {
          notification.success({
            message: '音频上传成功',
            description: '在个人中心中查看提交详情！',
          })
          this.loading = false
          this.$router.push({
            name: 'sightsing-list',
            replace: true,
            params: { lesson_No: this.quesDetail.part_id.charAt(18) },
          })
        })
        .catch((err) => {
          console.error(err)
          notification.error({
            message: '音频上传失败',
            description: err.response.data,
          })
          this.loading = false
        })
    },
    downloadAudio() {
      if (!this.record.url) {
        notification.error({
          message: '请选择音频后再进行下载！',
        })
        return
      }
      let link = document.createElement('a')
      link.href = this.record.url
      link.download = 'record.wav'
      link.click()
    },
    callback(msg) {
      console.log('Event: ', msg)
    },
    toggle() {
      var recorder = this.$refs.content.$el
      recorder.style.left = '0px'
      recorder.style.top = '0px'
      this.dragToggle = !this.dragToggle
    },
    // 录制器拖动
    draggable(drag) {
      var startEvt, moveEvt, endEvt
      // 判断是否支持触摸事件
      if ('ontouchstart' in window) {
        startEvt = 'touchstart'
        moveEvt = 'touchmove'
        endEvt = 'touchend'
      } else {
        startEvt = 'mousedown'
        moveEvt = 'mousemove'
        endEvt = 'mouseup'
      }
      var disX, disY, left, top, starX, starY, oLeft, oTop
      drag.addEventListener(startEvt, startFun)

      function startFun(event) {
        // 阻止页面的滚动，缩放
        event.preventDefault()
        // 兼容IE浏览器
        drag.style.cursor = 'grabbing'
        var e = event || window.event
        oLeft = drag.offsetLeft
        oTop = drag.offsetTop
        // 手指按下时的坐标
        starX = e.touches ? e.touches[0].clientX : e.clientX
        starY = e.touches ? e.touches[0].clientY : e.clientY
        // 手指相对于拖动元素左上角的位置
        disX = starX - drag.offsetLeft
        disY = starY - drag.offsetTop
        // 按下之后才监听后续事件
        document.addEventListener(moveEvt, moveFun)
        document.addEventListener(endEvt, endFun)
      }

      function moveFun(event) {
        // 兼容IE浏览器
        var e = event || window.event
        left = (e.touches ? e.touches[0].clientX : e.clientX) - disX
        top = (e.touches ? e.touches[0].clientY : e.clientY) - disY
        // 限制拖拽的X范围，不能拖出屏幕
        if (left < 0) {
          left = 0
        } else if (left > document.documentElement.clientWidth - drag.offsetWidth) {
          left = document.documentElement.clientWidth - drag.offsetWidth
        }
        // 限制拖拽的Y范围，不能拖出屏幕
        if (top < 0) {
          top = 0
        } else if (top > window.innerHeight - drag.offsetHeight) {
          top = window.innerHeight - drag.offsetHeight
        }
        drag.style.left = left + 'px'
        drag.style.top = top + 'px'
      }

      function endFun(event) {
        drag.style.cursor = ''
        document.removeEventListener(moveEvt, moveFun)
        document.removeEventListener(endEvt, endFun)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.fiedRecorder {
  cursor: move;
  position: fixed;
  text-align: center;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  z-index: 997;
}
.staticRecorder {
  position: static;
  text-align: center;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  z-index: 997;
}
</style>
