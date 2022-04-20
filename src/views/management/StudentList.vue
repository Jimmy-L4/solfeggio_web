<template>
  <page-header-wrapper content="学生管理界面主要用于查询学生信息及添加学生">
    <a-card :bordered="false" style="margin-bottom: 24px">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="学号">
                <a-input v-model="queryParam.studentId" placeholder="" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="班级">
                <a-select v-model="queryParam.class" placeholder="请选择">
                  <a-select-option value="0">20民乐班</a-select-option>
                  <a-select-option value="1">20作曲班</a-select-option>
                  <a-select-option value="2">21管乐、音教班</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (this.queryParam = {})">重置</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">添加学生</a-button>
      </div>
    </a-card>
    <a-card :bordered="false" style="margin-bottom: 24px">
      <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadData" showPagination="auto">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getRoleList, getStudentList } from '@/api/manage'

import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' },
  },
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
    title: '班级',
    dataIndex: 'class',

    needTotal: true,
  },
  {
    title: '等级',
    dataIndex: 'grade',
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
  },
  {
    title: '修读方式',
    dataIndex: 'studyMode',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
]

const statusMap = {
  0: {
    status: 'default',
    text: '离线',
  },
  1: {
    status: 'processing',
    text: '答题中',
  },
  2: {
    status: 'error',
    text: '未注册',
  },
}

export default {
  name: 'StudentList',
  components: {
    STable,
    CreateForm,
  },
  data() {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getStudentList(requestParameters).then((res) => {
          return res.result
        })
      },
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },
  },
  created() {
    getRoleList({ t: new Date() })
  },
  computed: {},
  methods: {
    handleAdd() {
      this.visible = true
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          // 新增
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
            }, 1000)
          }).then((res) => {
            this.visible = false
            this.confirmLoading = false
            // 重置表单数据
            form.resetFields()
            // 刷新表格
            this.$refs.table.refresh()
            this.$message.info('添加学生成功')
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
      const form = this.$refs.createModal.form
      // form.resetFields()
      // 清理表单数据
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date()),
      }
    },
  },
}
</script>
