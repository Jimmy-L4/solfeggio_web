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
          <a-card :body-style="{ paddingBottom: 20 }" hoverable>
            <a-card-meta :title="item.title" @click="handleEdit()"> </a-card-meta>
            <template slot="actions">
              <a-tooltip title="作答">
                <a-icon type="edit" />
              </a-tooltip>
              <a-tooltip :title="item.stateText">
                <a-icon :type="item.stateType" />
              </a-tooltip>
            </template>
            <div class="">
              <card-info :qusNum="item.qusNum" :score="item.score"></card-info>
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
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    },
  },
  mounted() {
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
    handleEdit() {
      this.$router.push({ name: 'choice', params: {} })
    },
    getList(lesson_No) {
      if (lesson_No) {
        this.lesson_No = lesson_No
      }
      this.loading = true
      console.log('练耳选择题列表获取')
      this.$http.get('/study/choiceList', { params: { lesson_No: this.lesson_No } }).then((res) => {
        console.log('res', res)
        this.itemList = res.result
        this.loading = false
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
