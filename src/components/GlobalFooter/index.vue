<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="_self" target="_blank">AI视唱练耳</a>
      <a href="https://www.bupt.edu.cn/" target="_blank">北京邮电大学</a>
      <a href="https://sdmda.bupt.edu.cn/" target="_blank">©数字媒体与智能计算实验室</a>
    </template>
    <template v-slot:copyright>
      <!-- <a href="https://musicmuc.chimusic.net/" target="_blank">AI视唱练耳</a> -->
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
