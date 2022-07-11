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
            <p><i class="title"></i>{{ userInfo.curriculumName }}</p>
            <p><i class="group"></i>{{ userInfo.className }}</p>
            <p><i class="address"></i>周一上午1-2节</p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width: 100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="(key) => handleTabChange(key, 'noTitleKey')"
        >
          <sightsing-list v-if="noTitleKey === 'sightsing'"></sightsing-list>
          <choice-list v-else-if="noTitleKey === 'choice'"></choice-list>
          <dictation-list v-else-if="noTitleKey === 'dictation'"></dictation-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { SightsingList, ChoiceList, DictationList } from './page'

import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    SightsingList,
    ChoiceList,
    DictationList,
  },
  data() {
    return {
      tabListNoTitle: [
        {
          key: 'sightsing',
          tab: '视唱',
        },
        {
          key: 'choice',
          tab: '练耳选择题',
        },
        {
          key: 'dictation',
          tab: '练耳听写题',
        },
      ],
      noTitleKey: 'sightsing',
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
  },
  created() {
    console.log(avatar)
  },
  methods: {
    handleTabChange(key, type) {
      this[type] = key
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
