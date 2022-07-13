<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="itemList">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="robot" text="AI评分:" :score="item.AI_score" />
            <icon-text type="solution" text="教师评分:" :score="item.score" />
            <icon-text :type="item.stateType" :text="item.stateText" />
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
import IconText from './components/IconText'
import { getSightsingingList } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

export default {
  components: {
    SightsingListContent,
    IconText,
  },
  data() {
    return {
      loading: true,
      itemList: [],
      form: this.$form.createForm(this),
      lesson_No: this.$store.getters.lesson_No,
      grade: this.$store.getters.userInfo.course.grade,
    }
  },
  beforeMount() {
    if (this.$route.params.lesson_No) {
      this.lesson_No = this.$route.params.lesson_No
    }
    this.getList()
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
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
