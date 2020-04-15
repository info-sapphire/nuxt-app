<template>
  <AppRemovePopover
    :value="value"
    :title="'группу'"
    :loading="loading"
    @click="removeGroup"
  />
</template>

<script>
import { mapActions } from 'vuex'

import AppRemovePopover from '~/components/elements/popover/AppRemovePopover'

export default {
  components: {
    AppRemovePopover
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    groupId: {
      type: String,
      required: true
    }
  },

  data: () => ({
    loading: false
  }),

  methods: {
    ...mapActions('groups', ['remove']),

    async removeGroup() {
      this.loading = true

      try {
        await this.remove(this.groupId)

        this.$message({
          message: 'Группа успешно удалена',
          type: 'success'
        })
      } catch (err) {
        this.$message({
          message: err.response.data.message,
          type: 'error'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
