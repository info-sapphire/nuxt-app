<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
    <ElTable
      :data="tableData"
      :load="load"
      lazy
      border
      style="width: 100%;"
      max-height="500px"
    >
      <ElTableColumn
        v-for="item in tableSchema"
        :key="item.prop"
        v-bind="item"
      />

      <ElTableColumn
        fixed="right"
        label="Operations"
        :min-width="120"
      >
        <template slot-scope="scope">
          <ElButton
            type="text"
            size="small"
            @click="handleClick(scope)"
          >
            Detail
          </ElButton>
          <ElButton
            type="text"
            size="small"
          >
            Edit
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'

import AppPageHeadline from '~/components/admin/page/AppPageHeadline'

export default {
  layout: 'admin',

  components: {
    AppPageHeadline
  },

  data: () => ({
    page: {
      name: 'Пользователи'
    },

    breadcrumbs: [{ name: 'Пользователи', link: '' }],

    tableSchema: [
      { prop: 'date', label: 'Date', 'min-width': '150', fixed: true },
      { prop: 'name', label: 'Name', 'min-width': '120' },
      { prop: 'state', label: 'State', 'min-width': '120' },
      { prop: 'city', label: 'City', 'min-width': '120' },
      { prop: 'address', label: 'Address', 'min-width': '180' },
      { prop: 'zip', label: 'Zip', 'min-width': '120' }
    ],

    tableData: [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office'
      }
    ]
  }),

  mounted () {
    // for (let i = 0; i < 100; i++) {
    //   this.tableData.push({
    //     date: '2016-05-03',
    //     name: 'Tom - ' + i,
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    //     tag: 'Home'
    //   })
    // }
  },

  methods: {
    handleClick (scope) {
      console.log(scope)
    },

    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: 'wangxiaohu'
          },
          {
            id: 32,
            date: '2016-05-01',
            name: 'wangxiaohu'
          }
        ])
      }, 1000)
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
}
</style>
