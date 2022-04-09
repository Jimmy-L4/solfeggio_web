<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>节拍器与标准音</a>
        </template>
        <template v-slot:description>
          <span> 练耳选择题播放题目前是否播放节拍器与标准音 </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <a-switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          :defaultChecked="(navTheme === 'dark' && true) || false"
          @change="onChange"
        />
      </template>
    </a-list-item>
  </a-list>
</template>
<script>
import { colorList } from '@/components/SettingDrawer/settingConfig'
import { baseMixin } from '@/store/app-mixin'
import { NAV_THEME, TOGGLE_NAV_THEME } from '@/store/mutation-types'

const themeMap = {
  dark: '暗色',
  light: '白色',
}

export default {
  mixins: [baseMixin],
  data() {
    return {}
  },
  filters: {
    themeFilter(theme) {
      return themeMap[theme]
    },
  },
  methods: {
    colorFilter(color) {
      const c = colorList.find((o) => o.color === color)
      return c && c.key
    },

    onChange(checked) {
      if (checked) {
        this.$store.commit(TOGGLE_NAV_THEME, NAV_THEME.DARK)
      } else {
        this.$store.commit(TOGGLE_NAV_THEME, NAV_THEME.LIGHT)
      }
    },
  },
}
</script>
