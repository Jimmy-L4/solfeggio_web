<template>
  <div>
    <div class="ant-pro-pages-list-applications-filterCardList">
      <a-list
        :loading="loading"
        :data-source="itemList"
        :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
        style="margin-top: 24px"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :body-style="{ paddingBottom: 20 }" hoverable @click="handleEdit(item)">
            <a-card-meta :title="item.title"> </a-card-meta>
            <template slot="actions">
              <div>
                <a-icon type="edit" />
                作答
              </div>
              <a-tooltip :title="item.stateDec">
                <a-icon :type="item.stateType" />
                {{ item.stateText }}
              </a-tooltip>
            </template>
            <div class="">
              <card-info :qusNum="item.qusNum" :score="item.score" :sumScore="item.sumScore"></card-info>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { AvatarList } from '@/components'
import CardInfo from './components/CardInfo'
import { getChoiceList } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'
const AvatarListItem = AvatarList.Item

export default {
  components: {
    AvatarList,
    AvatarListItem,
    CardInfo,
  },
  data() {
    return {
      itemList: [],
      form: this.$form.createForm(this),
      loading: true,
      lesson_No: this.$store.getters.lesson_No,
      grade: this.$store.getters.userInfo.course.grade,
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    },
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
      this.$router.push({ name: 'choice', params: { part_id: item.part_id } })
    },
    getList(lesson_No) {
      if (lesson_No) {
        this.lesson_No = lesson_No
      }
      this.loading = true
      console.log('练耳选择题列表获取')
      const parameter = { lesson_No: this.lesson_No, grade: this.grade }
      getChoiceList(parameter)
        .then((res) => {
          console.log('练耳选择题列表',res.result)
          this.itemList = res.result
          this.loading = false
        })
        .catch((e) => {
          console.error('获取选择题列表失败', e)
          notification.error({
            message: '获取选择题列表失败',
            description: e,
          })
          
        })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
