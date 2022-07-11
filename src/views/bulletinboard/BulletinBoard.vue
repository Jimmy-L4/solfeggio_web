<template>
  <page-header-wrapper>
    <a-card style="margin-top: 24px" :bordered="false" title="通知列表">
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="2">全部</a-radio-button>
          <a-radio-button value="1">展示中</a-radio-button>
          <a-radio-button value="0">已下架</a-radio-button>
        </a-radio-group>
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="handleAdd">添加</a-button>
      </div>

      <a-list size="large" :loading="iconLoading" ref="table">
        <a-list-item :key="index" v-for="(item, index) in noticeFilter">
          <a-list-item-meta :description="item.project.content">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.user.avatar" />
            <a slot="title">{{ item.project.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a-button type="link" @click="post(item.id)">{{ item.project.type ? '下架' : '发布' }}</a-button>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a-popconfirm title="是否要删除此通知？" @confirm="remove(item.id)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
                <a-menu-item><a @click="handleEdit(item.project)">编辑</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down" /></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>面向班级</span>
              <p>{{ item.project.class }}</p>
            </div>
            <div class="list-content-item">
              <span>通知时间</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-badge :status="item.project.type | statusTypeFilter" :text="item.project.type | statusFilter" />
            </div>
          </div>
        </a-list-item>
      </a-list>
      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getNoticeList } from '@/api/manage'

import CreateForm from './modules/CreateForm'

const statusMap = {
  0: {
    status: 'default',
    text: '已下架',
  },
  1: {
    status: 'processing',
    text: '展示中',
  },
}

const noticeList = []
export default {
  name: 'BulletinBoard',
  components: {
    CreateForm,
  },
  data() {
    return {
      noticeList,
      status: '2',
      iconLoading: false,
      pageInfo: {},
      visible: false,
      confirmLoading: false,
      mdl: null,
    }
  },
  mounted() {
    this.getNotices()
  },
  methods: {
    handleAdd() {
      this.mdl = null
      this.visible = true
    },
    handleEdit(record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
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

              this.$message.info('修改成功')
            })
          } else {
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

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    post(record) {
      this.iconLoading = true
      console.log('record', record)
      setTimeout(() => {
        this.iconLoading = false
      }, 1000)
    },
    remove(id) {
      const newData = this.noticeList.filter((item) => item.id !== id)
      this.noticeList = newData
    },
    getNotices() {
      this.iconLoading = true
      const parameter = { display: 'false' }
      getNoticeList(parameter).then((res) => {
        console.log(res)
        this.noticeList = res
        this.iconLoading = false
      })
    },
  },
  computed: {
    noticeFilter() {
      if (this.status == '2') {
        return this.noticeList
      } else {
        return this.noticeList.filter((item) => item.project.type == this.status)
      }
    },
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },
  },
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 80px;
  span {
    line-height: 20px;
    margin-right: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
