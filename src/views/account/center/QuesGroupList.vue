<template>
  <div>
    <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="itemList">
      <a-list-item :key="item.id" slot="renderItem" slot-scope="item" @click="handleEdit(item)">
        <template slot="actions">
          <icon-text type="robot" text="AI评分:" :score="item.computer_score" />
          <icon-text type="solution" text="教师评分:" :score="item.teacher_score" />
          <icon-text :type="item.stateType" :text="item.stateText" />
        </template>
        <a-list-item-meta>
          <a slot="title">{{ item.group_title }}</a>
          <template slot="description">
            <span>
              <p>作业题组提交时间：{{ item.record_time.replace('T', ' ').substring(0, 19) }}</p>
            </span>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const stateText = { 1: '正常提交', 2: '补交' }
import { SightsingListContent } from '@/components'
import IconText from './components/IconText'
import { getQuesGroupList } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

export default {
  name: 'QuesGroupList',
  components: {
    SightsingListContent,
    IconText,
  },
  props: {
    lesson_No: {
      type: String,
      required: true,
      default: '',
    },
  },
  watch: {
    lesson_No() {
      this.getList()
    },
  },
  data() {
    return {
      loading: true,
      itemList: [],
      userInfo: this.$store.getters.userInfo,
      stateText,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      console.log('获取题组提交列表')
      console.log(this.lesson_No)
      const parameter = { lesson_No: this.lesson_No, userId: this.userInfo.user }
      getQuesGroupList(parameter)
        .then((res) => {
          console.log(res)
          this.itemList = res.result
          this.loading = false
        })
        .catch((e) => {
          console.error('获取题组提交列表失败', e)
          notification.error({
            message: '获取题组提交列表失败',
            description: e,
          })
        })
    },
    // 跳转至对应听写页面
    handleEdit(item) {
      console.log(item)
      switch (item.group_part_id.charAt(0)) {
        case '3':
          this.$router.push({
            name: 'choice-result',
            params: { part_id: item.group_part_id + '01', sumScore: item.computer_score },
          })
          break
        case '0':
          this.$router.push({
            name: 'sightsing-result',
            params: { part_id: item.group_part_id + '01', sumScore: item.teacher_score },
          })
          break
        case '4':
          this.$router.push({
            name: 'dictation-result',
            params: { part_id: item.group_part_id + '01', sumScore: item.teacher_score },
          })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
