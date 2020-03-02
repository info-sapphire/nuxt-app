<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
  </div>
</template>

<script>
import AppPageHeadline from '~/components/admin/page/AppPageHeadline'

export default {
  layout: 'admin',

  components: {
    AppPageHeadline
  },

  data: () => ({
    page: {
      name: 'Настройки'
    },

    breadcrumbs: [
      { name: 'Аналитика', link: '/admin' },
      { name: 'Настройки', link: '' }
    ]
  })
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
