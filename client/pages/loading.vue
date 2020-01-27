<script>
export default {
  data: () => ({
    loading: null
  }),
  beforeCreate () {
    this.$nextTick(() => {
      this.loading = this.$loading({ lock: true })
    })
  },
  mounted () {
    setTimeout(() => {
      this.loading.close()
      this.loading = null
    }, 2000)
  },
  render () {
    return true
  }
}
</script>
