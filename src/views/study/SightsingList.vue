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
    </a-card>
  </div>
</template>

<script>
import { SightsingListContent } from '@/components'
import { getSightsingingList } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

const statusMap = {
  0: {
    status: 'processing',
    text: '待完成',
  },
  1: {
    status: 'default',
    text: '已完成',
  },
  2: {
    status: 'error',
    text: '已逾期',
  },
}

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
      this.$router.push({ name: 'sightsing', params: { quesDetail: item } })
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
            description: e,
          })
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
