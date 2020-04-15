<template>
  <ElButton
    v-bind="$attrs"
    @click.prevent="$emit('click')"
  >
    <slot />
    <AppLoading v-if="$attrs.loading" />
  </ElButton>
</template>

<script>
import AppLoading from '~/components/elements/loading/AppLoading'

export default {
  components: {
    AppLoading
  },

  computed: {
    // color () {
    //   return this.$attrs.type === 'default' ? '#ee4070' : '#fff'
    // }
  }
}
</script>
