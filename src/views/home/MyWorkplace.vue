<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title">
            {{ timeFix }}! {{ user.name }}<span class="welcome-text">, {{ welcome }}</span>
          </div>
          <div>{{ user.curriculumName }} | {{ user.className }}</div>
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }"
          >
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
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
                    <a href="/#/">{{ item.lesson_No }}</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" size="small" :src="item.user.avatar" />
                  <div slot="title">
                    成功在&nbsp;<a href="#">{{ item.project.name }}</a
                    >&nbsp; <span>{{ item.project.action }}</span
                    >&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
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
                <a-list-item-meta :description="item.startAt">
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

import { getRoleList, getServiceList, getNoticeList } from '@/api/manage'

import { TOGGLE_LESSON_No } from '@/store/mutation-types'

const DataSet = require('@antv/data-set')

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

      projects: [],
      loading: true,
      noteLoading: true,
      activities: [],
      notices: [],
      queryParam: {},

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null,
          },
          hideFirstLine: false,
        },
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null,
          },
        },
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80,
        },
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 },
      ],
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome,
    }),
    currentUser() {
      return {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      }
    },
    userInfo() {
      return this.$store.getters.userInfo
    },
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getRoleList().then((res) => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then((res) => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted() {
    this.getProjects()
    this.getActivity()
    this.getNotices()
  },
  methods: {
    // 切换课次并跳转至对应视唱
    handleTabChange(key) {
      this.$store.commit(TOGGLE_LESSON_No, key)
      this.$router.push({ name: 'sightsing-list', params: { lesson_No: key } })
    },
    getProjects() {
      this.$http.get('/list/search/projects').then((res) => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity() {
      this.$http.get('/workplace/activity').then((res) => {
        this.activities = res.result
      })
    },
    getNotices() {
      getNoticeList(this.parameter).then((res) => {
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
      font-size: 14px;

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
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
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
