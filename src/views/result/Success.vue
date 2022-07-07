<template>
  <div>
    <a-card :bordered="false" style="margin-bottom: 24px">
      <a-result status="success" :title="result.title" :sub-title="result.description">
        <template #extra>
          <a-button type="primary">{{ $t('result.success.btn-return') }}</a-button>
          <a-button style="margin-left: 8px">{{ $t('result.success.btn-project') }}</a-button>
          <a-button style="margin-left: 8px">{{ $t('result.success.btn-print') }}</a-button>
        </template>
      </a-result>
    </a-card>

  </div>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

const directionType = {
  horizontal: 'horizontal',
  vertical: 'vertical',
}

export default {
  name: 'Success',
  mixins: [baseMixin],
  data() {
    this.directionType = directionType
    return {
      // title: this.$t('result.success.title'),
      // description: this.$t('result.success.description')
    }
  },
  methods: {
    callback(e) {
      console.log(e)
    },
  },
  computed: {
    result() {
      return {
        title: this.$t('result.success.title'),
        description: this.$t('result.success.description'),
      }
    },
  },
}
</script>
