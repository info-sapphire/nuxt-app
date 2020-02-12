<template>
  <ElContainer
    v-loading="loading"
    :class="$style.container"
  >
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </ElContainer>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    list: []
  }),
  async created () {
    this.list = await this.$axios.$get('/api/media/list')
    this.loading = false
  }
}
</script>

<style lang="scss" module>
.container {
  position: relative;
}
</style>
