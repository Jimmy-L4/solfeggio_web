<template>
  <div class="cardInfo">
    <div>
      <p>题目数量</p>
      <p>{{ qusNum }}</p>
    </div>
    <div>
      <p>题目总分</p>
      <p>{{ sumScore }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardInfo',
  props: {
    qusNum: {
      type: [String, Number],
      default: 0,
    },
    sumScore: {
      type: [String, Number],
      default: 0,
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@/components/index.less';
@import '~@/utils/utils.less';

.cardInfo {
  .clearfix();

  margin-top: 16px;
  margin-left: 40px;
  & > div {
    position: relative;
    float: left;
    width: 50%;
    text-align: left;
    p {
      margin: 0;
      font-size: 24px;
      line-height: 32px;
    }
    p:first-child {
      margin-bottom: 4px;
      color: @text-color-secondary;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
