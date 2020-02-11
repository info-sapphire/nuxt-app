<template>
  <div>
    <h1>hello from admin/uploads</h1>
    <ul>
      <li
        v-for="(item, index) in fileList"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData ({ $axios }) {
    // console.log($axios)
    const fileList = await $axios.$get('/api/media/list')
    return { fileList }
  },
  mounted () {
    console.log('fileList: ', this.fileList)
  }
}
</script>
