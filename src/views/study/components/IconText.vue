<template>
  <span>
    <a-icon :type="type" style="margin-right: 8px" />
    <a-badge :status="statusMap[text].status" :text="text" />
    {{ score }}
  </span>
</template>

<script>
const statusMap = {
  已完成: {
    status: 'default',
  },
  待完成: {
    status: 'processing',
  },
  未完成: {
    status: 'error',
  },
}
export default {
  name: 'IconText',
  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: [String, Number],
      required: true,
    },
    score: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      statusMap,
    }
  },
  computed: {
    textClass() {
      if ((text = '待完成')) {
        return waitClass
      } else if ((text = '已完成')) {
        return grayClass
      } else {
        return redClass
      }
    },
  },
}
</script>
<style lang="less" scoped></style>
