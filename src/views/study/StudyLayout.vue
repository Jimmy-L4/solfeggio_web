<template>
  <page-header-wrapper :tab-list="tabList" :tab-active-key="tabActiveKey" :tab-change="handleTabChange">
    <template v-slot:content>
      <div class="ant-pro-page-header-search">
        <a-input-search size="large" style="width: 80%; max-width: 522px">
          <template v-slot:enterButton> 搜索 </template>
        </a-input-search>
      </div>
    </template>

    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form layout="inline">
        <standard-form-row title="选择课次" :last="true" style="padding-bottom: 0px">
          <a-form-item>
            <a-radio-group :defaultValue="lesson_No" v-model:value="lesson_No" @change="lessonChange">
              <a-radio-button value="1">课次一</a-radio-button>
              <a-radio-button value="2">课次二</a-radio-button>
              <a-radio-button value="3">课次三</a-radio-button>
              <a-radio-button value="4">课次四</a-radio-button>
              <a-radio-button value="5">课次五</a-radio-button>
              <a-radio-button value="6">课次六</a-radio-button>
              <a-radio-button value="7">课次七</a-radio-button>
              <a-radio-button value="8">课次八</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </standard-form-row>
      </a-form>
    </a-card>

    <router-view ref="Childmain" />
  </page-header-wrapper>
</template>

<script>
import { TagSelect, StandardFormRow } from '@/components'
const TagSelectOption = TagSelect.Option
const getActiveKey = (path) => {
  switch (path) {
    case '/study/sightsing-list':
      return '1'
    case '/study/choice-list':
      return '2'
    case '/study/dictation-list':
      return '3'
    default:
      return '1'
  }
}
export default {
  components: {
    TagSelect,
    TagSelectOption,
    StandardFormRow,
  },
  name: 'SearchLayout',
  data() {
    return {
      tabList: [
        { key: '1', tab: '视唱题目' },
        { key: '2', tab: '练耳选择题' },
        { key: '3', tab: '练耳听写题' },
      ],
      tabActiveKey: '1',
      search: true,
      lesson_No: this.$store.getters.lesson_No,
    }
  },
  created() {
    this.tabActiveKey = getActiveKey(this.$route.path)
    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.$router.push({ name: 'sightsing-list', params: { lesson_No: this.lesson_No } })
          break
        case '2':
          this.$router.push({ name: 'choice-list', params: { lesson_No: this.lesson_No } })
          break
        case '3':
          this.$router.push({ name: 'dictation-list', params: { lesson_No: this.lesson_No } })
          break
        default:
          this.$router.push('/home')
      }
    },
    lessonChange(e) {
      this.$refs['Childmain'].getList(this.lesson_No)
    },
  },
}
</script>

<style lang="less" scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
</style>
