<template>
  <page-header-wrapper title="听写题答题卡" content="听写题答题卡">
    <a-card :title="groupTitle" :bordered="false">
      <a-card
        :body-style="{ padding: '24px 2px', height: '800px' }"
        v-for="(item, index) in questionList.slice(current - 1, current)"
        :key="0 + index"
      >
        <div slot="title">
          {{ item.ques_txt }}
          <a-divider style="margin: 16px 0" />
          <!-- 题目信息 -->
          <img v-if="item.ques_pic_path" :width="800" :src="item.ques_pic_path" />
          <a-divider v-if="item.ques_pic_path" style="margin: 16px 0" />
          <!-- 题目音频 -->
          <my-player :src="item.ques_audio_path" :metroSrc="metroSrc(item)" />
          <a-divider style="margin: 16px 0" />
          <a-steps :current="current - 1">
            <a-step v-for="(item, index) in questionList" :title="'第' + (index + 1) + '题'" :key="1 + index" />
          </a-steps>
        </div>
        <!-- 选项 -->
        <iframe
          id="subBut"
          v-if="fresh"
          class="iframe_box"
          name="myLeadsheet"
          src="/leadsheet/samples/simpleInterface/interface.html"
          frameborder="0"
          scrolling="auto"
        ></iframe>
      </a-card>
    </a-card>

    <footer-tool-bar>
      <a-button type="dashed" @click="showInfo">打开听写板教程</a-button>
      <a-tooltip placement="topRight" v-if="statusMap[state].disabled">
        <template #title>
          <span>{{ statusMap[state].text }}</span>
        </template>
        <a-button :disabled="true" type="primary" :loading="loading" style="margin-left: 20px">提交</a-button>
      </a-tooltip>
      <a-popconfirm v-else title="确认切换下一题吗？切换后本题将提交！" @confirm="handleSubmit" @cancel="cancelSubmit">
        <a-button type="primary" :loading="loading" style="margin-left: 20px">{{ buttonText }}</a-button>
      </a-popconfirm>
    </footer-tool-bar>
    <a-modal v-model:visible="InfoVaild" title="听写板教程" width="70%">
      <h1>一、功能总览</h1>
      <img width="100%" src="/media/image/intro1.jpg" alt="教程" />
      <h3>
        整个听写板分为菜单栏和输入栏两部分，在输入栏选中指定的音符后（单击音符选中或鼠标拖动多选），可以通过点击菜单栏对应功能按钮来实现音符输入。
      </h3>
      <h1>二、菜单栏</h1>
      <img width="100%" src="/media/image/intro2.jpg" alt="教程" />
      <h3>
        菜单栏包括改变音高、升降符号、时值、连音、单音和复制粘贴等功能。在输入栏选中音符后，再点击对应按钮来实现功能；当鼠标悬停在功能按钮上时，会显示功能名称和对应的键盘快捷键，可以通过键盘快捷键来快速执行。
      </h3>
      <h1>三、键盘快捷键</h1>
      <h3>键盘快捷键可以通过键盘来快速实现指定功能,快捷键分为功能快捷键和基本快捷键。</h3>
      <h2>功能快捷键</h2>
      <h3>功能快捷键即为菜单栏中所有功能对应的快捷键，将鼠标悬停在功能按钮上即可查看；</h3>
      <h2>基本快捷键</h2>
      <p>ABCDEFG - 指定的八度</p>
      <p>Ctrl+Z - 撤销</p>
      <p>Ctrl+Y - 恢复</p>
      <p>Ctrl+C - 复制</p>
      <p>Ctrl+V - 粘贴</p>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { getDictationQuesList, uploadJson, uploadPNG, uploadDictionAnswer } from '@/api/manage'
import { timeFix } from '@/utils/util'
import notification from 'ant-design-vue/es/notification'
// 新人引导
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

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
  name: 'DictationLayout',
  components: {
    FooterToolBar,
  },
  data() {
    return {
      userInfo: this.$store.getters.userInfo,
      metronome: this.$store.getters.metronome,
      loading: false,
      questionList: [],
      current: 1,
      part_id: '',
      state: 0,
      JSONSong: '',
      viewer: '',
      songModel: '',
      songList: [],
      fresh: true,
      statusMap,
      InfoVaild: false,
    }
  },
  beforeMount() {
    if (this.$route.params.part_id) {
      this.part_id = this.$route.params.part_id
      this.state = this.$route.params.state
      console.log('首题part_id:', this.part_id)
    } else {
      this.$router.push({ name: 'home', replace: true })
    }
    this.getQuestion()
  },
  mounted() {
    this.getQuestion()
    window.updateModel = this.getModle
  },
  computed: {
    groupTitle() {
      return this.questionList.length ? this.questionList[0]['L_ques_txt'] : ''
    },
    buttonText() {
      return this.questionList.length == this.current ? '提交' : '下一题'
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
    // handler
    handleSubmit() {
      if (this.JSONSong == '') {
        notification.error({
          message: '请先输入曲谱再提交!',
          description: '',
        })
        return
      }
      this.uploadField()
    },
    uploadField() {
      let pngData = this.uploadPNGField()
      let jsonData = this.uploadJsonField()
      this.loading = true

      uploadPNG(pngData)
        .then((PNGres) => {
          console.log(PNGres)
          uploadJson(jsonData)
            .then((JSONres) => {
              console.log(JSONres)
              this.loading = false
              this.songList.push({
                part_id: this.part_id.substring(0, 20) + this.current,
                json: JSONres.content.replace('http://127.0.0.1:8000/media/', ''),
                png: PNGres.content.replace('http://127.0.0.1:8000/media/', ''),
              })
              if (this.questionList.length == this.current) {
                console.log(this.songList)
                this.submitHomework()
              } else {
                this.current += 1
                this.JSONSong = ''
                this.reloadIframe()
              }
            })
            .catch((err) => {
              console.error(err)
              notification.error({
                message: 'JSON上传失败',
              })
              this.loading = false
            })
        })
        .catch((err) => {
          console.error(err)
          notification.error({
            message: '图片上传失败',
          })
        })
    },
    uploadJsonField() {
      let data = new FormData()
      var blob = new Blob([JSON.stringify(this.JSONSong)], { type: 'text/json' })
      data.append(
        'content',
        blob,
        this.part_id.substring(0, 20) + this.current + '-' + this.userInfo.user.toString() + '.json'
      )
      data.append('part_id', this.part_id.substring(0, 20) + this.current)
      data.append('user', this.userInfo.user)
      return data
    },
    DataURIToBlob(dataURI) {
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const urlString = splitDataURI[0].split(':')[1].split(';')[0]
      const flow = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) flow[i] = byteString.charCodeAt(i)
      return new Blob([flow], { type: urlString })
    },
    uploadPNGField() {
      var resolutionRatio = 3 // don't go over 3-4 because then toDataUrl is getting too big on long leadsheet and export doesn't work
      // augment resolution
      this.viewer.canvas.width = this.viewer.canvas.width * resolutionRatio
      this.viewer.typeResize = 'scale'
      this.viewer._resize(this.viewer.canvas.width)
      this.viewer.draw(this.songModel)
      var pngURL = this.viewer.canvas.toDataURL('image/png', '1')
      let data = new FormData()
      var blob = this.DataURIToBlob(pngURL)
      data.append(
        'content',
        blob,
        this.part_id.substring(0, 20) + this.current + '-' + this.userInfo.user.toString() + '.png'
      )
      data.append('part_id', this.part_id.substring(0, 20) + this.current)
      data.append('user', this.userInfo.user)
      // reduce resolution
      this.viewer.typeResize = 'fluid'
      this.viewer.canvas.width = Math.ceil(this.viewer.canvas.width / resolutionRatio)
      this.viewer._resize(this.viewer.canvas.width)
      this.viewer.draw(this.songModel)
      return data
    },
    submitHomework() {
      const parameter = {
        groupPart_id: this.part_id.substring(0, 19),
        field: this.songList,
        user: this.userInfo.user,
        lesson_No: this.part_id.charAt(18),
      }
      uploadDictionAnswer(parameter)
        .then((res) => {
          notification.success({
            message: '音频上传成功',
            description: '在个人中心中查看提交详情！',
          })
          this.loading = false
          this.$router.push({
            name: 'dictation-list',
            replace: true,
            params: { lesson_No: this.part_id.charAt(18) },
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
    cancelSubmit() {
      console.log('用户取消了提交作业')
    },
    reloadIframe() {
      this.fresh = false
      this.$nextTick(() => {
        this.fresh = true
      })
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
      const parameter = { part_id: this.part_id, withAnswer: 0 }
      getDictationQuesList(parameter)
        .then((res) => {
          this.questionList = res
          console.log('题目列表', this.questionList)
        })
        .catch((e) => {
          console.error('获取听写题信息失败', e)
          notification.error({
            message: '获取听写题信息失败',
            description: e.response.data,
          })
        })
    },
    getModle(JSONSong, songId, viewer, songModel) {
      this.JSONSong = JSONSong
      this.viewer = viewer
      this.songModel = songModel
    },
    // 打开引导页面
    showDriver() {
      console.log(
        window.document.getElementById('subBut').contentWindow.document.getElementById('edit_pitch_container')
      )
      const steps = [
        {
          element: window.document
            .getElementById('subBut')
            .contentWindow.document.getElementById('edit_pitch_container'), //获取元素节点
          popover: {
            title: '我是标题1',
            description: '我是描述文字1',
            position: 'bottom-center', //提示框的位置
          },
        },
      ]
      const driver = new Driver({
        //初始化引导页
        doneBtnText: '知道了', // 结束按钮的文字
        allowClose: false, // 是否可以通过点击遮罩层关闭指引
        stageBackground: '#fff', // 突出显示元素的背景颜色
        nextBtnText: '下一步', // 下一步按钮的文字
        prevBtnText: '上一步', // 上一步按钮的文字
        closeBtnText: '关闭', // 关闭按钮的文字
        keyboardControl: false, // 是否允许键盘操控
        xCloseButton: false, // 将关闭按钮作为X放在弹出
      })
      driver.defineSteps(steps)
      driver.start()
    },
    showInfo() {
      this.InfoVaild = true
    },
  },
}
</script>
<style lang="less" scoped>
.iframe_box {
  width: 100%;
  height: 100%;
}
</style>
