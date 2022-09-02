<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="itemList">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <a-badge :status="statusMap[item.state].status" :text="statusMap[item.state].text" />
          </template>
          <a-list-item-meta>
            <a slot="title" @click="handleEdit(item)">{{ item.part_name }}</a>
            <template slot="description">
              <span>
                <a-tag v-if="item.audio_detail.audio_instrument">{{ item.audio_detail.audio_instrument }}</a-tag>
                <a-tag v-if="item.audio_detail.audio_nation">{{ item.audio_detail.audio_nation }}</a-tag>
                <a-tag v-if="item.audio_detail.audio_skill">{{ item.audio_detail.audio_skill }}</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <sightsing-list-content
            :description="item.description"
            :player="item.audio_detail.audio_player"
            :audioName="item.audio_detail.audio_name"
          />
        </a-list-item>
      </a-list>
      <a-modal
        v-model:visible="modelVisible"
        title="双声部信息录入"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        :destroyOnClose="true"
      >
        <p>请搜索输入双声部合作同学的学号</p>
        <a-input-search
          v-model:value="studentId"
          placeholder="请输入学号后进行搜索"
          enter-button
          @search="onSearch"
          :loading="searchLoading"
        />
        <a-list-item v-if="coopStudentInfo.id != ''">
          <a-list-item-meta :description="coopStudentInfo.id">
            <a-avatar slot="avatar" size="large" :src="coopStudentInfo.avatar" />
            <div slot="title">
              {{ coopStudentInfo.name }}
            </div>
          </a-list-item-meta>
        </a-list-item>
        <!-- 暂时不用选声部，进入哪个声部就唱哪个声部 -->
        <p style="margin-top: 10px">请选择你将要演唱的声部</p>
        <a-space direction="vertical">
          <a-radio-group v-model:value="voicePart" option-type="button" :options="plainOptions" />
        </a-space>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { SightsingListContent } from '@/components'
import { getSightsingingList, getStudentInfo } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

const statusMap = {
  0: {
    status: 'processing',
    text: '待完成',
  },
  1: {
    status: 'success',
    text: '已完成',
  },
  2: {
    status: 'error',
    text: '已逾期',
  },
  3: {
    status: 'default',
    text: '未开放',
  },
}
const plainOptions = ['低声部', '高声部']

export default {
  components: {
    SightsingListContent,
  },
  data() {
    return {
      statusMap,
      loading: true,
      itemList: [],
      form: this.$form.createForm(this),
      lesson_No: '',
      grade: this.$store.getters.userInfo.course.grade,
      userInfo: this.$store.getters.userInfo,
      quesDetail: '',
      modelVisible: false,
      confirmLoading: false,
      searchLoading: false,
      studentId: '',
      coopStudentInfo: {
        id: '',
        avater: '',
        name: '',
      },
      voicePart: '低声部',
      plainOptions,
    }
  },
  beforeMount() {
    if (this.$route.params.lesson_No) {
      this.lesson_No = this.$route.params.lesson_No
    } else {
      this.lesson_No = this.$store.getters.lesson_No
    }
    this.getList()
  },
  methods: {
    // 跳转至对应练耳页面
    handleEdit(item) {
      if (item.state == 3) {
        notification.error({
          message: '该题目尚未开放',
          description: '',
        })
      } else {
        if (item.part_id.charAt(2) == '3') {
          this.quesDetail = item
          this.modelVisible = true
        } else {
          this.$router.push({ name: 'sightsing', params: { quesDetail: item } })
        }
      }
    },
    getList(lesson_No) {
      if (lesson_No) {
        this.lesson_No = lesson_No
      }
      this.loading = true
      console.log('视唱列表获取')
      console.log('当前课次:', this.lesson_No)
      const parameter = { lesson_No: this.lesson_No, grade: this.grade }
      getSightsingingList(parameter)
        .then((res) => {
          this.itemList = res.result
          this.loading = false
        })
        .catch((e) => {
          console.error('获取视唱题列表失败', e)
          notification.error({
            message: '获取视唱题列表失败',
            description: '',
          })
        })
    },
    handleOk() {
      if (this.coopStudentInfo.id != '') {
        this.$router.push({
          name: 'sightsing',
          params: { quesDetail: this.quesDetail, coopStudentInfo: this.coopStudentInfo, voicePart: this.voicePart },
        })
      } else {
        notification.error({
          message: '请搜索合作者后再进行作答！',
          description: '未选择双声部合作同学',
        })
      }
    },
    handleCancel() {
      this.confirmLoading = false
      this.searchLoading = false
      this.studentId = ''
      this.coopStudentInfo = {
        id: '',
        avater: '',
        name: '',
      }
    },
    onSearch() {
      if (this.studentId == '') {
        notification.error({
          message: '请输入学号后再进行搜索',
          duration: 2,
        })
      } else if (this.studentId == this.userInfo.id) {
        notification.error({
          message: '无法与本人进行合作，请搜索同课程其他同学',
          duration: 2,
        })
      } else {
        this.searchLoading = true
        const parameter = { studentId: this.studentId, courseId: this.userInfo.course.id }
        getStudentInfo(parameter)
          .then((res) => {
            this.searchLoading = false
            console.log(res.result)
            this.coopStudentInfo = res.result
          })
          .catch((e) => {
            this.searchLoading = false
            this.coopStudentInfo = { id: '', avater: '', name: '' }
            console.error('查询学生失败', e)
            notification.error({
              message: '查询学生失败',
              description: '未查询到学生，请仔细核对学号！',
            })
          })
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
