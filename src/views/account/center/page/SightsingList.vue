<template>
  <div>
    <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="itemList">
      <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
        <template slot="actions">
          <icon-text type="robot" text="AI评分:" :score="item.AIscore" />
          <icon-text type="solution" text="教师评分:" :score="item.score" />
          <icon-text :type="item.stateType" :text="item.stateText" />
        </template>
        <a-list-item-meta>
          <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
          <template slot="description">
            <span>
              <a-tag v-if="item.instrument">{{ item.instrument }}</a-tag>
              <a-tag v-if="item.nation">{{ item.nation }}</a-tag>
              <a-tag v-if="item.skill">{{ item.skill }}</a-tag>
            </span>
          </template>
        </a-list-item-meta>
        <sightsing-list-content
          :description="item.description"
          :player="item.player"
          :href="item.href"
          :audioName="item.audioName"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { SightsingListContent } from '@/components'
import IconText from './components/IconText'

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
    }
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
    getList(lesson_No) {
      if (lesson_No) {
        this.lesson_No = lesson_No
      }
      this.loading = true
      console.log('视唱列表获取')
      console.log(this.lesson_No)
      this.$http.get('/study/sightsingList', { params: { lesson_No: this.lesson_No } }).then((res) => {
        console.log('res', res)
        this.itemList = res.result
        this.loading = false
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
