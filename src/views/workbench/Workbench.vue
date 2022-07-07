<template>
  <page-header-wrapper content="作业空间界面主要用于批改学生作业及查询题目内容">
    <a-card class="card" title="题目选择" :bordered="false">
      <selection-box ref="selection" :showSubmit="true" />
    </a-card>

    <a-card class="card" :bordered="false" title="题目信息">
      <a-descriptions title="基础信息">
        <a-descriptions-item label="歌曲名称">《除草歌》</a-descriptions-item>
        <a-descriptions-item label="演奏者">叶春雨</a-descriptions-item>
        <a-descriptions-item></a-descriptions-item>
        <a-descriptions-item label="乐器">声乐</a-descriptions-item>
        <a-descriptions-item label="名族">高山族</a-descriptions-item>
        <a-descriptions-item></a-descriptions-item>
      </a-descriptions>

      <a-card type="inner" title="曲谱信息">
        <img
          :width="500"
          src="https://musicmuc.chimusic.net/solfeggio/library/Autumn_semester_2024/13_%E8%AF%BE%E6%AC%A12_1_12_74.png"
        />
        <a-divider style="margin: 16px 0" />
        <audio-player
          src="https://musicmuc.chimusic.net/solfeggio/library/All_audio_test/lv4_/lesson_4/sing/RRRR4SR_104.mp3"
        />
      </a-card>
    </a-card>

    <a-card class="card" :bordered="false" title="作业提交详情">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info title="应提交" value="35份" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="未提交" value="3份" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="已批改" value="24份" />
        </a-col>
      </a-row>
    </a-card>

    <!-- table -->
    <a-card title="学生提交">
      <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">批改</a>
          </template>
        </span>
      </s-table></a-card
    >
  </page-header-wrapper>
</template>

<script>
import SelectionBox from './SelectionBox'
import { STable } from '@/components'
import { baseMixin } from '@/store/app-mixin'
import Info from './components/Info'
import { getCommitList } from '@/api/manage'

const columns = [
  {
    title: '学号',
    sorter: true,
    dataIndex: 'studentId',
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
  },
  {
    title: '提交时间',
    dataIndex: 'updatedAt',
    sorter: true,
  },
  {
    title: '机器评分',
    dataIndex: 'AIscore',
    sorter: true,
  },
  {
    title: '分数',
    dataIndex: 'score',
    sorter: true,
  },

  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' },
  },
]

export default {
  name: 'Workbench',
  mixins: [baseMixin],
  components: {
    SelectionBox,
    Info,
    STable,
  },
  data() {
    this.columns = columns
    return {
      loading: false,
      memberLoading: false,
      errors: [],
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getCommitList(requestParameters).then((res) => {
          console.log(res.result)
          return res.result
        })
      },
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
    },
    // 跳转至对应批改页面
    handleEdit(e) {
      console.log(e)
      this.$router.push({ name: 'correcting', params: { } })
    },

    // 最终全页面提交
    validate() {
      const {
        $refs: { selection },
        $notification,
      } = this
      const selectionForm = new Promise((resolve, reject) => {
        selection.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })

      // clean this.errors
      this.errors = []
      Promise.all([selectionForm])
        .then((values) => {
          $notification['error']({
            message: 'Received values of form:',
            description: JSON.stringify(values),
          })
        })
        .catch(() => {
          const errors = Object.assign({}, selection.form.getFieldsError())
          console.log(errors)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
.popover-wrapper {
  /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
    min-width: 256px;
    max-height: 290px;
    padding: 0;
    overflow: auto;
  }
}
.antd-pro-pages-forms-style-errorIcon {
  user-select: none;
  margin-right: 24px;
  color: #f5222d;
  cursor: pointer;
  i {
    margin-right: 4px;
  }
}
.antd-pro-pages-forms-style-errorListItem {
  padding: 8px 16px;
  list-style: none;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e6f7ff;
  }
  .antd-pro-pages-forms-style-errorIcon {
    float: left;
    margin-top: 4px;
    margin-right: 12px;
    padding-bottom: 22px;
    color: #f5222d;
  }
  .antd-pro-pages-forms-style-errorField {
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}
</style>
