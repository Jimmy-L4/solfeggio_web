<template>
  <span>
    <a-icon :type="type" style="margin-right: 8px" />
    {{ text }}
    {{ score }}
  </span>
</template>

<script>
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
}
</script>
