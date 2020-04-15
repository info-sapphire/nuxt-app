<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
    <GroupActions />
    <Draggable
      v-if="groupsLoaded"
      v-model="groups"
      v-bind="draggableOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <TransitionGroup
        type="transition"
        name="flip-list"
        tag="div"
        :class="$style.list_group"
      >
        <div
          v-for="(group, index) in groups"
          :key="group.position"
          :class="$style.list__item"
        >
          <div :class="$style.list__header">
            <div :class="$style.list__info">
              <span :class="$style.list__handle" />
              <span>{{ group.name }}</span>
            </div>
            <RemoveGroup
              :value="popover[index]"
              :group-id="group._id"
            />
          </div>
          <div :class="$style.list__body">
            <ElTree
              :ref="`treeRoles_${group.position}`"
              v-bind="treeOptions"
            >
              <span slot-scope="{ node }">
                <span
                  @click.stop="
                    onSelect({ id: node.label, position: group.position })
                  "
                >
                  {{ node.label.toLowerCase() }}
                </span>
              </span>
            </ElTree>
            <UpdateGroup
              :group-id="group._id"
              :position="group.position"
            />
          </div>
        </div>
      </TransitionGroup>
    </Draggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Draggable from 'vuedraggable'

import AppPageHeadline from '~/components/elements/page-headline/AppPageHeadline'

import GroupActions from '~/components/groups/elements/groupActions'
import RemoveGroup from '~/components/groups/elements/removeGroup'
import UpdateGroup from '~/components/groups/elements/UpdateGroup'

export default {
  components: {
    Draggable,
    AppPageHeadline,

    GroupActions,
    RemoveGroup,
    UpdateGroup
  },

  async fetch({ store, params, error }) {
    await store.dispatch('groups/list')
  },

  provide() {
    return {
      root: this
    }
  },

  data: () => ({
    page: {
      name: 'Группы'
    },

    breadcrumbs: [
      { name: 'Пользователи', link: '/users' },
      { name: 'Группы', link: '' }
    ],

    /* el-tree props */
    defaultProps: {
      children: 'children',
      label: 'label'
    },

    popover: []
  }),

  computed: {
    ...mapGetters('groups', ['roles']),

    groups: {
      set(groups) {
        this.$store.commit('groups/SET_GROUPS', groups)
      },
      get() {
        return this.$store.getters['groups/groups']
      }
    },

    groupsLoaded() {
      return this.groups.length > 0
    },

    draggableOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: this.$style.ghost,
        class: this.$style.list,
        handle: `.${this.$style.list__handle}`,
        tag: 'div'
      }
    },

    treeOptions() {
      return {
        'show-checkbox': true,
        'default-expand-all': true,
        'node-key': 'id',
        'highlight-current': true,
        data: this.roles,
        props: this.defaultProps,
        class: this.$style.list__tree
      }
    }
  },

  watch: {
    groups: {
      deep: true,
      immediate: true,
      handler(value) {
        this.popover = []
        this.list = []

        value.forEach(group => {
          this.popover.push(false)
          this.list.push(group.position)

          this.$nextTick(() => {
            const tree = this.$refs[`treeRoles_${group.position}`]
            if (tree !== undefined) {
              tree[0].setCheckedKeys(group.roles)
            }
          })
        })
      }
    }
  },

  methods: {
    onSelect({ id, position }) {
      const treeId = `treeRoles_${position}`
      const tree = this.$refs[treeId]

      if (tree === undefined) {
        console.warn(`${treeId} not found`)
        return
      }

      let roles = tree[0].getCheckedKeys()
      const role = roles.find(role => role === id)

      if (role === undefined) {
        roles.push(id)
      } else {
        // eslint-disable-next-line unicorn/prefer-includes
        roles = roles.filter(role => role.indexOf(id) === -1)

        /** remove parent */
        const findRole = role.split('_')
        if (findRole[1] !== undefined) {
          roles = roles.filter(role => role !== findRole[0])
        }
      }

      tree[0].setCheckedKeys(roles)
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  display: block;

  :global(.flip-list-move) {
    transition: transform 0.5s;
  }

  :global(.no-move) {
    transition: transform 0.5s;
  }

  :global(.el-tree-node__expand-icon:not(.is-leaf):before) {
    content: '';
    display: block;
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="448px" height="512px" viewBox="0 0 448 512"><path d="M0 128.032v255.93c0 28.425 34.488 42.767 54.627 22.627l128-127.962c12.496-12.496 12.497-32.758 0-45.255l-128-127.968C34.528 85.305 0 99.55 0 128.032zM160 256L32 384V128l128 128z"></path></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    width: 18px;
    height: 20px;
    background-position-x: 5px;
  }

  :global(.el-tree-node__children) {
    padding-left: 18px;
  }

  .list {
    .list_group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      justify-content: flex-start;

      .list__item {
        position: relative;
        display: block;
        padding: 0;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        height: 100%;
        width: calc(33.3% - 5px);
        margin-right: 5px;
        margin-bottom: 5px;

        &.ghost {
          border: 1px dashed #0088f8;
          background: rgba(0, 136, 249, 0.09);

          & > div {
            opacity: 0;
          }
        }

        .list__header {
          background: #f5f7fa;
          padding: 15px;
          border-bottom: 1px solid #ebeef5;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .list__info {
            display: flex;

            .list__handle {
              background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M0 7.5v5h50v-5H0zm0 15v5h50v-5H0zm0 15v5h50v-5H0z" color="%23000"/></svg>');
              background-size: contain;
              background-repeat: no-repeat;
              cursor: move;
              display: block;
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
          }
        }

        .list__body {
          padding: 10px;

          .list__tree {
            height: 280px;
            overflow-y: scroll;
          }
        }
      }
    }
  }
}
</style>
