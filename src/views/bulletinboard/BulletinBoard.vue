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
            <a-button type="link" @click="post(item.project, item.id)">{{
              item.project.type ? '下架' : '发布'
            }}</a-button>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a-popconfirm title="是否要删除此通知？" @confirm="remove(item.project, item.id)">
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
                <a-menu-item><a @click="handleEdit(item.project, item.id)">编辑</a></a-menu-item>
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
              <p>{{ item.startAt.replace('T', ' ').substring(0, 19) }}</p>
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
import { getNoticeList, updateNotice, addNotice, deleteNotice } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

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

export default {
  name: 'BulletinBoard',
  components: {
    CreateForm,
  },
  data() {
    return {
      noticeList: [],
      status: '2',
      iconLoading: false,
      visible: false,
      confirmLoading: false,
      mdl: null,
      userInfo: this.$store.getters.userInfo,
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
    handleEdit(record, id) {
      this.visible = true
      this.mdl = { ...record, id: id }
      console.log('md1', this.mdl)
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            const parameter = {
              id: values.id,
              type: 1,
              title: values.title,
              content: values.content,
              classes: values.class,
            }
            updateNotice(parameter)
              .then((res) => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                this.getNotices()
                notification.success({
                  message: '更新通知成功！',
                  description: '',
                })
              })
              .catch((err) => {
                console.error('err', err)
                notification.error({
                  message: '更新通知失败！',
                  description: '',
                })
                this.confirmLoading = false
              })
          } else {
            // 新增
            const parameter = {
              type: 1,
              title: values.title,
              content: values.content,
              classes: values.class,
              nickname: this.userInfo.name,
              avatar: this.userInfo.avatar,
              author: this.userInfo.user,
            }
            addNotice(parameter)
              .then((res) => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                this.getNotices()
                notification.success({
                  message: '添加通知成功！',
                  description: '',
                })
              })
              .catch((err) => {
                console.error('err', err)
                notification.error({
                  message: '添加通知失败！',
                  description: '',
                })
                this.confirmLoading = false
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
    post(record, id) {
      this.iconLoading = true
      const parameter = {
        id: id,
        type: record.type ? 0 : 1,
        title: record.title,
        content: record.content,
        classes: record.class,
      }
      console.log(parameter)
      updateNotice(parameter)
        .then((res) => {
          console.log('res', res)
          this.getNotices()
          notification.success({
            message: record.type ? '下架通知成功！' : '发布通知成功！',
            description: '',
          })
        })
        .catch((err) => {
          console.error('err', err)
          notification.error({
            message: record.type ? '下架通知失败！' : '发布通知失败！',
            description: '',
          })
          this.iconLoading = false
        })
    },
    remove(record, id) {
      this.confirmLoading = false
      const parameter = {
        id: id,
        type: -1,
        title: record.title,
        content: record.content,
        classes: record.class,
      }
      deleteNotice(parameter)
        .then((res) => {
          console.log('res', res)
          this.getNotices()
          notification.success({
            message: '删除通知成功！',
            description: '',
          })
        })
        .catch((err) => {
          console.error('err', err)
          notification.error({
            message: '删除通知失败！',
            description: '',
          })
          this.iconLoading = false
        })
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
