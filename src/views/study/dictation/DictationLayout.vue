<template>
  <page-header-wrapper title="听写题答题卡" content="听写题答题卡">
    <a-card :body-style="{ padding: '24px 32px', height: '700px' }" :bordered="false" :loading="loading">
      <iframe
        class="iframe_box"
        name="myLeadsheet"
        src="/leadsheet/samples/simpleInterface/interface.html"
        frameborder="0"
        scrolling="auto"
      ></iframe>
      <div id="player_test"></div>
    </a-card>
    <!-- <footer-tool-bar>
      <a-button type="primary" @click="handleSubmit" :loading="loading">提交</a-button>
    </footer-tool-bar> -->
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'

export default {
  name: 'DictationLayout',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    // handler
    handleSubmit(JSONSong, songId, derivedId) {
      console.log(JSONSong, songId, derivedId)
    },
    handleChange(e) {
      console.log(this.questionList)
    },
    handleMessage(e) {
      const data = e.data
      console.log(data)
      if ((data.cmd = 'submitWork')) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$message.info('作业提交成功!')
          this.$router.push({ name: 'dictation-list', params: {} })
        }, 1000)
      }
    },
  },
  mounted() {
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
