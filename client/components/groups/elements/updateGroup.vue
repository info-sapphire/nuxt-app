<template>
  <AppButton
    type="primary"
    size="mini"
    :loading="loading"
    :class="$style.update"
    @click="updateGroup"
  >
    Обновить группу
  </AppButton>
</template>

<script>
import { mapActions } from 'vuex'

import AppButton from '~/components/elements/button/AppButton'

export default {
  components: {
    AppButton
  },

  inject: ['root'],

  props: {
    groupId: {
      type: String,
      required: true
    },

    position: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    loading: false
  }),

  methods: {
    ...mapActions('groups', ['update']),

    async updateGroup() {
      const treeId = `treeRoles_${this.position}`
      const tree = this.root.$refs[treeId]

      if (tree === undefined) {
        console.warn(`${treeId} not found`)
        return
      }

      const roles = tree[0].getCheckedKeys()
      const dummy = []

      roles.forEach(role => {
        // eslint-disable-next-line unicorn/prefer-includes
        const parent = roles.find(r => r.indexOf(`${role}_`) !== -1)
        if (parent === undefined) {
          dummy.push(role)
        }
      })

      this.loading = true

      try {
        await this.update({ id: this.groupId, payload: { roles: dummy } })

        this.$message({
          message: 'Роли группы успешно обновлены',
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

<style lang="scss" module>
.update {
  margin-top: 10px;
}
</style>
