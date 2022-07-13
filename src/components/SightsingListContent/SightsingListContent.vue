<template>
  <div class="components-sightsing-list-content-index-listContent">
    <div class="description">
      <slot>
        {{ description }}
      </slot>
    </div>
    <div class="extra">
      由 <a>{{ player }}</a> 演唱的 <a>{{ audioName }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SightsingListContent',
  props: {
    prefixCls: {
      type: String,
      default: 'components-sightsing-list-content-index-listContent',
    },
    description: {
      type: String,
      default: '',
    },
    player: {
      type: String,
      required: true,
    },
    audioName: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
@import '../index.less';

.components-sightsing-list-content-index-listContent {
  .description {
    max-width: 720px;
    line-height: 22px;
  }
  .extra {
    margin-top: 16px;
    color: @text-color-secondary;
    line-height: 22px;
  }
}

@media screen and (max-width: @screen-xs) {
  .components-sightsing-list-content-index-listContent {
    .extra {
      & > em {
        display: block;
        margin-top: 8px;
        margin-left: 0;
      }
    }
  }
}
</style>
