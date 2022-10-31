<template>
  <page-header-wrapper :tab-list="tabList" :tab-active-key="tabActiveKey" :tab-change="handleTabChange">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form  label="选择课次">

        <a-form-item label="选择课次:" style="width:100%;">
          <a-radio-group :defaultValue="lesson_No" v-model:value="lesson_No" @change="lessonChange">
            <a-row type="flex" justify="space-between" align="bottom">
              <a-col :span="6" v-for="btn in lessonBtn" style="margin-top:12px">
                <a-radio-button :value="btn.key">{{ btn.tab }}</a-radio-button>
              </a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>

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
    // 当前版本关闭听写题
    // case '/study/dictation-list':
    //   return '3'
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
        // 当前版本关闭听写题
        // { key: '3', tab: '练耳听写题' },
      ],
      tabActiveKey: '1',
      search: true,
      lesson_No: '',
      lessonBtn: [
        { key: '1', tab: '课次一' },
        { key: '2', tab: '课次二' },
        { key: '3', tab: '课次三' },
        { key: '4', tab: '课次四' },
        { key: '5', tab: '课次五' },
        { key: '6', tab: '课次六' },
        { key: '7', tab: '课次七' },
        { key: '8', tab: '课次八' },
      ]
    }
  },
  created() {
    if (this.$route.params.lesson_No) {
      this.lesson_No = this.$route.params.lesson_No
    } else {
      this.lesson_No = this.$store.getters.lesson_No
    }
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
        // 当前版本关闭听写题
        // case '3':
        //   this.$router.push({ name: 'dictation-list', params: { lesson_No: this.lesson_No } })
        //   break
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
