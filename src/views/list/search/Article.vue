<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <article-list-content
            :description="item.description"
            :owner="item.owner"
            :avatar="item.avatar"
            :href="item.href"
            :updateAt="item.updatedAt"
          />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { ArticleListContent } from '@/components'
import IconText from './components/IconText'

const owners = [
  {
    id: 'wzj',
    name: '我自己',
  },
  {
    id: 'wjh',
    name: '吴家豪',
  },
  {
    id: 'zxx',
    name: '周星星',
  },
  {
    id: 'zly',
    name: '赵丽颖',
  },
  {
    id: 'ym',
    name: '姚明',
  },
]

export default {
  components: {
    ArticleListContent,
    IconText,
  },
  data() {
    return {
      owners,
      loading: true,
      loadingMore: false,
      data: [],
      form: this.$form.createForm(this),
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    getList() {
      this.$http.get('/list/article').then((res) => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    loadMore() {
      this.loadingMore = true
      this.$http
        .get('/list/article')
        .then((res) => {
          this.data = this.data.concat(res.result)
        })
        .finally(() => {
          this.loadingMore = false
        })
    },
    setOwner() {
      const {
        form: { setFieldsValue },
      } = this
      setFieldsValue({
        owner: ['wzj'],
      })
    },
  },
}
</script>

<style lang="less" scoped>
.list-articles-trigger {
  margin-left: 12px;
}
</style>
