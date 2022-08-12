<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar" />
            </div>
            <div class="username">{{ nickname }}</div>
            <div class="bio">{{ userInfo.id }}</div>
          </div>
          <div class="account-center-detail">
            <p><i class="title"></i>{{ userInfo.course.name }}</p>
            <p><i class="group"></i>{{ userInfo.className }}</p>
            <p><i class="address"></i>{{ userInfo.course.classroom }}</p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card style="width: 100%" title="作业提交详情" :bordered="false">
          <a-form layout="inline">
            <a-form-item>
              <a-radio-group :defaultValue="lesson_No" v-model:value="lesson_No" @change="lessonChange">
                <a-radio-button :value="item.key" v-for="(item, key) in tabListNoTitle" :key="key">
                  {{ item.tab }}
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
          <a-divider />

          <ques-group-list ref="Childmain" :lesson_No="lesson_No"></ques-group-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import QuesGroupList from './QuesGroupList'

import { mapGetters } from 'vuex'
const tabListNoTitle = [
  {
    key: '1',
    tab: '课次一',
  },
  {
    key: '2',
    tab: '课次二',
  },
  {
    key: '3',
    tab: '课次三',
  },
  {
    key: '4',
    tab: '课次四',
  },
  {
    key: '5',
    tab: '课次五',
  },
  {
    key: '6',
    tab: '课次六',
  },
  {
    key: '7',
    tab: '课次七',
  },
  {
    key: '8',
    tab: '课次八',
  },
]
export default {
  components: {
    QuesGroupList,
  },
  data() {
    return {
      tabListNoTitle,
      lesson_No: this.$store.getters.lesson_No,
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
  },
  created() {},
  methods: {
    lessonChange() {
      console.log(this.lesson_No)
    },
  },
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
  .ant-pro-components-tag-select {
    /deep/ .ant-pro-tag-select .ant-tag {
      margin-right: 24px;
      padding: 0 8px;
      font-size: 14px;
    }
  }

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }
}
</style>
