<template>
  <div>
    <div class="ant-pro-pages-list-projects-cardList">
      <a-list :loading="loading" :data-source="itemList" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable>
            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta :title="item.title" @click="handleEdit()">
              <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { AvatarList, Ellipsis } from '@/components'
const AvatarListItem = AvatarList.Item

export default {
  components: {
    AvatarList,
    Ellipsis,
    AvatarListItem,
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
    // 跳转至对应听写题页面
    handleEdit() {
      this.$router.push({ name: 'dictation', params: {} })
    },
    getList(lesson_No) {
      if (lesson_No) {
        this.lesson_No = lesson_No
      }
      this.loading = true
      console.log('练耳听写题列表获取')
      this.$http.get('/study/dictationList', { params: { lesson_No: this.lesson_No } }).then((res) => {
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
