<template>
  <div>
    <h1>hello from admin/uploads</h1>
    <AppUpload />
  </div>
</template>

<script>
import AppUpload from '~/components/admin/AppUpload'

export default {
  layout: 'admin',
  components: {
    AppUpload
  }
}
</script>
