<template>
  <div class="container">
    <UploadHeader class="container__header" />
    <AppUpload />
  </div>
</template>

<script>
import AppUpload from '~/components/upload/AppUpload'
import UploadHeader from '~/components/upload/elements/UploadHeader'

export default {
  components: {
    AppUpload,
    UploadHeader
  }
}
</script>

<style lang="scss" scoped>
.container {
  &__header {
    margin-bottom: 20px;
  }
}
</style>
