<template>
  <ElTable
    :key="maxHeight"
    :data="tableData"
    border
    style="width: 100%;"
    :max-height="`${maxHeight}px`"
  >
    <ElTableColumn
      v-for="item in tableSchema"
      :key="item.prop"
      v-bind="item"
    />

    <UserActions
      :min-width="90"
      @remove="removeUser"
    />

    <InfiniteLoading
      slot="append"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      @infinite="infiniteHandler"
    />
  </ElTable>
</template>

<script>
import { mapActions } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

import UserActions from '~/components/users/elements/userActions'

export default {
  components: {
    InfiniteLoading,
    UserActions
  },

  props: {
    maxHeight: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    tableSchema: [
      { prop: 'date', label: 'Дата регистрации', 'min-width': '190' },
      { prop: 'email', label: 'Почта', 'min-width': '120' },
      { prop: 'group', label: 'Группа', 'min-width': '120' }
    ],

    tableData: []
  }),

  methods: {
    ...mapActions('users', ['list']),

    removeUser(userId) {
      const userIndex = this.tableData.findIndex(user => user.userId === userId)
      if (userIndex !== -1) {
        this.tableData.splice(userIndex, 1)
      }
    },

    async infiniteHandler($state) {
      try {
        const { results, next } = await this.list(!!this.tableData.length)

        this.tableData.push(
          ...results.map(user => ({
            date: user.created
              .split('T')
              // eslint-disable-next-line no-extra-boolean-cast
              .map((item, index) =>
                index
                  ? item.split('.')[0]
                  : item
                    .split('-')
                    .reverse()
                    .join('.')
              )
              .join(' - '),
            email: user.email,
            group: user.group.name,
            userId: user._id
          }))
        )

        if (next) {
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (error) {
        console.error(error)
        $state.complete()
      }
    }
  }
}
</script>
