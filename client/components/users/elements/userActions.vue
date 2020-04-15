<template>
  <ElTableColumn
    label="Действия"
    :min-width="minWidth"
  >
    <div
      slot-scope="scope"
      :class="$style.action"
    >
      <ElButton
        type="primary"
        size="small"
        :class="$style.action__edit"
        @click="editUser(scope)"
      >
        <AwesomeIcon :name="'user-edit'" />
      </ElButton>
      <AppRemovePopover
        :value="popover"
        :loading="loading"
        :title="'пользователя'"
        :width="192"
        :hide-break="true"
        @click="removeUser(scope)"
      />
    </div>
  </ElTableColumn>
</template>

<script>
import { mapActions } from 'vuex'

import AppRemovePopover from '~/components/elements/popover/AppRemovePopover'

export default {
  components: {
    AppRemovePopover
  },

  props: {
    minWidth: {
      type: Number,
      default: 120
    }
  },

  data: () => ({
    loading: false,
    popover: false
  }),

  methods: {
    ...mapActions('users', ['remove']),

    editUser(scope) {
      const {
        row: { userId }
      } = scope
      this.$router.push(`/users/${userId}`)
    },

    async removeUser(scope) {
      try {
        const {
          row: { userId }
        } = scope

        this.loading = true
        await this.remove(userId)

        this.$emit('remove', userId)

        this.$message({
          message: 'Пользователь успешно удален',
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
.action {
  &__edit {
    padding: 0;
    width: 30px;
    height: 30px;

    & > span {
      width: 14px;
      height: 14px;
      display: block;
      margin: 0 auto;
      left: 1px;
      position: relative;

      & > svg {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
