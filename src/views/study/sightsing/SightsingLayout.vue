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
          <a-descriptions-item label="范例音"> </a-descriptions-item>
        </a-descriptions>
        <audio-player :src="global_url + quesDetail.audio_path" />

        <a-card type="inner" title="曲谱信息" style="margin-top: 24px">
          <img :width="800" :src="global_url + quesDetail.pic_path" />
        </a-card>
        <a-card>
          <div style="min-height: 250px">
            <my-recorder
              ref="content"
              :class="dragToggle ? 'staticRecorder' : 'fiedRecorder'"
              upload-url="/api/router/audio/"
              :attempts="5"
              :time="2"
              :headers="headers"
              :part_id="quesDetail.part_id"
              :user_id="userInfo.user"
              :start-record="callback"
              :stop-record="callback"
              :start-upload="callback"
              :successful-upload="successUpload"
              :failed-upload="failedUpload"
              :dragToggle="toggle"
            />
          </div>
        </a-card>
      </a-card>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import notification from 'ant-design-vue/es/notification'
export default {
  name: 'SightsingLayout',
  components: {},
  data() {
    return {
      global_url: 'https://musicmuc.chimusic.net/solfeggio/',
      loading: false,
      dragToggle: true,
      token: this.$store.getters.token,
      userInfo: this.$store.getters.userInfo,
      quesDetail: {},
    }
  },
  computed: {
    headers() {
      return {
        Authorization: 'Bearer ' + this.token,
      }
    },
  },
  beforeCreate() {
    if (!this.$route.params.quesDetail) {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  beforeMount() {
    if (this.$route.params.quesDetail) {
      this.quesDetail = this.$route.params.quesDetail
      console.log('题目信息：', this.quesDetail)
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
  },
  mounted() {
    this.draggable(this.$refs.content.$el)
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
    failedUpload(msg) {
      console.log('uploadResult: ', msg)
      notification.error({
        message: '音频上传失败',
        description: msg.content,
      })
    },
    successUpload(msg) {
      console.log('uploadResult: ', msg)
      notification.success({
        message: '音频上传成功',
        description: msg.content,
      })
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
