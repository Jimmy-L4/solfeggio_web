<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ user.name }}<span class="welcome-text">老师,</span>{{ timeFix }}!
          </div>
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :key="i" v-for="(course, i) in user.course_list" class="project-list" style="margin-bottom: 24px"
            :bordered="false" :title="course.name" :body-style="{ padding: 0 }">
            <div>
              <a>
                <a-card-grid class="project-card-grid" :key="item.id" v-for="(item, i) in classFilter(course.id)">
                  <a-card :bordered="false" :body-style="{ padding: 0 }" @click="handleEdit(item.id)">
                    <a-card-meta>
                      <div slot="title" class="card-title">
                        <a>{{ item.name }}</a>
                      </div>
                      <div slot="description" class="card-description">
                        {{ course.classroom }}
                      </div>
                    </a-card-meta>
                    <div class="project-item">
                      <span class="datetime">{{ classtime(course.time) }}</span>
                    </div>
                  </a-card>
                </a-card-grid>
              </a>
            </div>
          </a-card>

        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="通知栏" style="margin-bottom: 24px" :loading="noteLoading" :bordered="false"
            :body-style="{ padding: 10 }">
            <div>
              <a-empty v-if="!notices.length" description="暂无通知" />
              <a-list-item :key="index" v-for="(item, index) in notices">
                <a-list-item-meta :description="item.startAt.replace('T', ' ').substring(0, 19)">
                  <a-avatar slot="avatar" size="large" :src="item.user.avatar" />
                  <div slot="title">
                    {{ item.project.title }}
                  </div>
                  <div slot="title">
                    {{ item.project.content }}
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

import { getNoticeList } from '@/api/manage'

export default {
  name: 'TeacherWorkplace',
  components: {
    PageHeaderWrapper,
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      noteLoading: true,
      notices: [],
      lesson_No: this.$store.getters.lesson_No,
      userInfo: this.$store.getters.userInfo,
    }
  },
  computed: {
    deadline() {
      const deadline = this.userInfo.lesson_deadline.replace('T', ' ')
      return '所有课程(课次截止时间:' + deadline + ')'
    },
    classtime() {
      return (str) => {
        const map = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '天' }
        const list = str.split('-')
        console.log();
        return '星期' + map[list[0]] + ' ' + list[1]
      }

    }
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted() {
    this.getNotices()
  },
  methods: {
    // 跳转至对应课程学生列表
    handleEdit(id) {
      this.$router.push({ name: 'management', params: { class_id: id } })
    },
    getNotices() {
      const parameter = { display: 'true' }
      getNoticeList(parameter).then((res) => {
        this.notices = res.filter(
          (item) => item.project.class == this.user.className || item.project.class == '所有班级'
        )
        this.noteLoading = false
        console.log('通知列表', this.notices)
      })
    },
    classFilter(course_id) {
      return this.user.class_list.filter(
        (item) => item.course == course_id
      )
    },
  },
  filters: {

  },
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';


.page-header-content {
  display: flex;

  .avatar {
    flex: 0 1 72px;

    &>span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }

  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: @text-color-secondary;
    line-height: 22px;

    .content-title {
      margin-bottom: 12px;
      color: @heading-color;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }
}


.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 16px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 16px;
    height: 22px;
    line-height: 22px;

    a {
      color: rgba(0, 0, 0, 0.6);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.45);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
