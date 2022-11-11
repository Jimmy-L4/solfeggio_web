<template>
  <page-header-wrapper content="作业空间界面主要用于批改学生作业及查询题目内容">
    <a-card class="card" title="题目选择" :bordered="false">
      <selection-box ref="selection" @info="getUpload" :showSubmit="true" />
    </a-card>

    <a-card class="card" :bordered="false" title="题目信息">
      <div v-if="questionDetail.audio_detail">
        <a-descriptions title="基础信息">
          <a-descriptions-item label="歌曲名称">{{ questionDetail.audio_detail.audio_name }}</a-descriptions-item>
          <a-descriptions-item label="演奏者">{{ questionDetail.audio_detail.audio_player }}</a-descriptions-item>
          <a-descriptions-item></a-descriptions-item>
          <a-descriptions-item label="乐器">{{ questionDetail.audio_detail.audio_instrument }}</a-descriptions-item>
          <a-descriptions-item label="名族">{{ questionDetail.audio_detail.audio_nation }}</a-descriptions-item>
          <a-descriptions-item></a-descriptions-item>
        </a-descriptions>

        <div style="font-size: 14px; color: rgba(0, 0, 0, 0.85); margin-bottom: 16px; font-weight: 500">
          <div>范例音:
            <audio-player style="margin-top: 12px" :src="questionDetail.audio_path" />
          </div>
        </div>

        <a-card type="inner" title="曲谱信息" style="margin-top: 24px">
          <img style=" text-align: center" width="97%" :src="questionDetail.pic_path" />
        </a-card>
      </div>
      <a-empty v-else description="暂无题目, 请先点击查询" />
    </a-card>

    <a-card class="card" :bordered="false" title="作业提交概况">
      <a-row v-if="jobInfo.total_len">
        <a-col :sm="8" :xs="24">
          <info title="应提交" :value="jobInfo.total_len + '份'" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="未提交" :value="jobInfo.uncommitted_len + '份'" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="已批改" :value="jobInfo.marked_len + '份'" />
        </a-col>
      </a-row>
      <a-empty v-else description="暂无提交概况, 请先点击查询" />
    </a-card>

    <!-- table -->
    <a-card title="学生提交">
      <s-table ref="commit" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="AIscore" slot-scope="text">
          <template>
            {{ text == null ? 0 : text }}
          </template>
        </span>
        <span slot="score" slot-scope="text">
          <template>
            {{ text == null ? 0 : text }}
          </template>
        </span>
        <span slot="action" slot-scope="text, record, index">
          <template>
            <a-badge v-if="record.updatedAt == '未提交'" status="error" text="未提交" />
            <a v-else-if="record.score == null" @click="handleEdit(record, index)" style="color:red;">批阅分数</a>
            <a v-else @click="handleEdit(record, index)" style="color:green;">修改分数</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import SelectionBox from './SelectionBox'
import { STable } from '@/components'
import { baseMixin } from '@/store/app-mixin'
import Info from './components/Info'
import { getCommitList } from '@/api/manage'
import { getCommitInfo } from '@/api/manage'
import { link } from 'fs'

const columns = [
  {
    title: '学号',
    dataIndex: 'studentId',
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
  },
  {
    title: '提交时间',
    dataIndex: 'updatedAt',
  },
  {
    title: '机器评分',
    dataIndex: 'AIscore',
    scopedSlots: { customRender: 'AIscore' },
  },
  {
    title: '分数',
    dataIndex: 'score',
    scopedSlots: { customRender: 'score' },
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
      part_id: '',
      grade: '',
      questionDetail: {},
      userInfo: this.$store.getters.userInfo,
      jobInfo: {},
      commitList: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const queryParam = { course_list: this.getRealCourse, part_id: this.part_id }
        const requestParameters = Object.assign({}, parameter, queryParam)
        return getCommitInfo(requestParameters).then((res) => {
          this.commitList = res.data.filter(item => item.updatedAt != '未提交')
          console.log(this.commitList);
          this.jobInfo = { total_len: res.total_len, uncommitted_len: res.uncommitted_len, marked_len: res.marked_len }
          return res
        })
      },
    }
  },
  computed: {
    getRealCourse() {
      const realList = this.userInfo.course_list.filter(item => item.grade == this.grade)
      let idList = realList.map(item => item.id)
      console.log(idList);
      return idList
    }
  },
  mounted() {
    if (this.$route.params.part_id) {
      this.$refs.selection.handlePartId(this.$route.params.part_id)
    }
  },
  methods: {
    // 跳转至对应批改页面
    handleEdit(record, index) {
      console.log(index);
      const parameter = { questionDetail: this.questionDetail, index: index, part_id: this.part_id, commitList: this.commitList }
      this.$router.push({ name: 'correcting', params: parameter })
    },
    getUpload(quse, part_id, grade) {
      this.questionDetail = quse
      this.part_id = part_id
      this.grade = grade
      this.$refs.commit.refresh()
    }

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
