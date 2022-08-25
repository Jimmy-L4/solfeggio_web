<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}! {{ user.name }}<span class="welcome-text">, {{ welcome }}</span>
          </div>
          <div>{{ user.course.name }} | {{ user.className }}</div>
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            style="margin-bottom: 24px"
            :bordered="false"
            :title="deadline"
            :body-style="{ padding: 0 }"
          >
            <div>
              <a>
                <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                  <a-card :bordered="false" :body-style="{ padding: 0 }" @click="handleEdit(i)">
                    <a-card-meta>
                      <div slot="title" class="card-title">
                        <a-avatar size="small" :src="item.cover" />
                        <a>{{ item.title }}</a>
                      </div>
                      <div slot="description" class="card-description">
                        {{ item.description }}
                      </div>
                    </a-card-meta>
                    <div class="project-item">
                      <a>课次{{ lesson_text[lesson_No - 1] }}</a>
                      <span class="datetime">{{ state_text[lesson_state] }}</span>
                    </div>
                  </a-card>
                </a-card-grid>
              </a>
            </div>
          </a-card>

          <a-card :loading="loading" title="本课次动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" size="small" :src="avatar" />
                  <div slot="title">
                    成功在&nbsp;
                    <a @click="handleTabChange(lesson_No)">课次{{ lesson_text[item.lesson_No - 1] }}</a
                    >&nbsp; <span>提交了</span>&nbsp;
                    <a>{{ item.group_title }}</a>
                  </div>
                  <div slot="description">{{ item.record_time.replace('T', ' ').substring(0, 19) }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="课次导航" style="margin-bottom: 24px" :bordered="false" :body-style="{ padding: 0 }">
            <div class="item-group">
              <a @click="handleTabChange('1')">课次一</a>
              <a @click="handleTabChange('2')">课次二</a>
              <a @click="handleTabChange('3')">课次三</a>
              <a @click="handleTabChange('4')">课次四</a>
              <a @click="handleTabChange('5')">课次五</a>
              <a @click="handleTabChange('6')">课次六</a>
              <a @click="handleTabChange('7')">课次七</a>
              <a @click="handleTabChange('8')">课次八</a>
            </div>
          </a-card>
          <a-card
            title="通知栏"
            style="margin-bottom: 24px"
            :loading="noteLoading"
            :bordered="false"
            :body-style="{ padding: 10 }"
          >
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
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'

import { getNoticeList, getQuesGroupList } from '@/api/manage'
import notification from 'ant-design-vue/es/notification'

const projects = [
  {
    id: 1,
    cover: '/media/image/sightsinging.png',
    title: '视唱',
    description: '视唱作业',
  },
  {
    id: 2,
    cover: '/media/image/choice.png',
    title: '练耳选择题',
    description: '练耳选择题作业',
  },
  {
    id: 3,
    cover: '/media/image/dictation.png',
    title: '练耳听写题',
    description: '练耳听写题作业',
  },
]
const lesson_text = ['一', '二', '三', '四', '五', '六', '七', '八']
const state_text = ['已截止', '未开放', '进行中']

export default {
  name: 'MyWorkplace',
  components: {
    PageHeaderWrapper,
    Radar,
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      projects,
      lesson_text,
      state_text,
      loading: true,
      noteLoading: true,
      activities: [],
      notices: [],
      lesson_No: this.$store.getters.lesson_No,
      userInfo: this.$store.getters.userInfo,
    }
  },
  computed: {
    ...mapState({
      welcome: (state) => state.user.welcome,
    }),
    deadline() {
      const deadline = this.userInfo.lesson_deadline.replace('T', ' ')
      return '当前课次(截止时间:' + deadline + ')'
    },
    lesson_state() {
      const lesson_Number = Number(this.lesson_No)
      const state = this.userInfo.vailLessons[lesson_Number - 1]
      console.log(state)
      return state + 1
    },
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted() {
    this.getActivity()
    this.getNotices()
  },
  methods: {
    // 切换课次并跳转至对应视唱
    handleTabChange(key) {
      this.$router.push({ name: 'sightsing-list', params: { lesson_No: key } })
    },
    // 跳转至对应学习空间
    handleEdit(item) {
      const nameList = ['sightsing-list', 'choice-list', 'dictation-list']
      this.$router.push({ name: nameList[item] })
    },
    getActivity() {
      console.log('获取题组提交列表')
      console.log(this.lesson_No)
      const parameter = { lesson_No: this.lesson_No, userId: this.userInfo.user }
      getQuesGroupList(parameter)
        .then((res) => {
          this.activities = res.result
          console.log('本课次动态', this.activities)
          this.loading = false
        })
        .catch((e) => {
          console.error('获取题组提交列表失败', e)
          this.loading = false
          notification.error({
            message: '获取题组提交列表失败',
            description: e,
          })
        })
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
  },
}
</script>

<style lang="less" scoped>
@import './MyWorkplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 18px;

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

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
