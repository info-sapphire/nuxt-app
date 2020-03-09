<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
    <div :class="$style.actions">
      <AppButton
        type="success"
        size="mini"
        :loading="createGroupDialogSchemaLoading"
        @click="onPopup"
      >
        Добавить группу
      </AppButton>
      <AppCreateGroupDialog
        v-if="createGroupDialogLoaded"
        ref="createGroupDialog"
        :position="lastPosition"
      />
    </div>
    <Draggable
      v-if="groupsLoaded"
      v-model="list"
      v-bind="dragOptions"
      :class="$style.list"
      handle=".handle"
      tag="div"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <TransitionGroup
        type="transition"
        name="flip-list"
        tag="div"
        :class="$style.list__group"
      >
        <div
          v-for="(group, index) in groups"
          :key="group.position"
          :class="$style.list__group__item"
        >
          <div :class="$style.list__group__header">
            <div :class="$style.list__group__info">
              <span class="handle" />
              <span>{{ group.name }}</span>
            </div>
            <div>
              <ElPopover
                v-model="popover[index].show"
                placement="top"
                width="180"
              >
                <p>
                  Вы действительно<br>
                  хотите удалить группу?
                </p>
                <div style="text-align: right; margin: 0">
                  <ElButton
                    size="mini"
                    type="text"
                    @click="popover[index].show = false"
                  >
                    отмена
                  </ElButton>
                  <ElButton
                    type="primary"
                    size="mini"
                    @click="removeGroup({ id: group._id, index })"
                  >
                    да
                  </ElButton>
                </div>
                <AppButton
                  slot="reference"
                  size="mini"
                  type="danger"
                  :loading="popover[index].loading"
                  :class="$style.list__group__remove"
                >
                  <AwesomeIcon :name="'trash-alt'" />
                </AppButton>
              </ElPopover>
            </div>
          </div>
          <div :class="$style.list__group__body">
            <ElTree
              :ref="`treeRoles_${group.position}`"
              :data="roles"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
              :class="$style.list__group__tree"
            >
              <span
                slot-scope="{ node }"
                class="custom-tree-node"
              >
                <span
                  :key="'label-select'"
                  @click.stop="
                    onSelect({ id: node.label, position: group.position })
                  "
                >
                  {{ node.label.toLowerCase() }}
                </span>
              </span>
            </ElTree>
            <AppButton
              type="primary"
              size="mini"
              :class="$style.list__group__update"
              @click="onUpdate({ id: '_id', position: group.position })"
            >
              Обновить группу
            </AppButton>
          </div>
        </div>
      </TransitionGroup>
    </Draggable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Draggable from 'vuedraggable'

import AppPageHeadline from '~/components/admin/page/AppPageHeadline'
import AppButton from '~/components/admin/elements/button/AppButton'
import AppCreateGroupDialog from '~/components/admin/groups/AppCreateGroupDialog'

export default {
  layout: 'admin',

  components: {
    Draggable,
    AppPageHeadline,
    AppButton,
    AppCreateGroupDialog
  },

  async fetch ({ store, params, error }) {
    await store.dispatch('users/groupsList')
  },

  data: () => ({
    page: {
      name: 'Группы'
    },

    breadcrumbs: [
      { name: 'Пользователи', link: '/admin/users' },
      { name: 'Группы', link: '' }
    ],

    createGroupDialogSchemaLoading: false,
    createGroupDialogVisible: false,
    createGroupDialogLoaded: false,

    defaultProps: {
      children: 'children',
      label: 'label'
    },

    list: [],

    popover: []
  }),

  computed: {
    ...mapGetters('users', ['roles', 'groups']),

    groupsLoaded () {
      return this.groups.length > 0
    },

    lastPosition () {
      return this.groupsLoaded ? this.groups.length + 1 : 1
    },

    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },

  watch: {
    groups: {
      deep: true,
      immediate: true,
      handler (value) {
        value.forEach(_ => {
          this.popover.push({ show: false, loading: false })
        })
      }
    }
  },

  mounted () {
    console.log('groups: ', this.groups)
  },

  methods: {
    ...mapActions('settings', ['schema']),
    ...mapActions('users', {
      _removeGroup: 'removeGroup'
    }),

    removeGroup ({ id, index }) {
      this.popover[index].loading = true
      this.popover[index].show = false
      this._removeGroup(id)
        .then(() => {
          this.$message({
            message: 'Группа успешно удалена',
            type: 'success'
          })
        })
        .finally(() => {
          this.popover[index].loading = false
        })
    },

    onSelect ({ id, position }) {
      const tree = this.$refs[`treeRoles_${position}`]
      if (tree !== undefined) {
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
        console.log(roles)
        tree[0].setCheckedKeys(roles)
      } else {
        console.warn(`unknown tree: treeRoles_${position}`)
      }
    },

    onUpdate (object) {
      const tree = this.$refs[`treeRoles_${object.position}`]
      if (tree !== undefined) {
        console.log(tree[0].getCheckedKeys())
      }
    },

    onPopup () {
      this.createGroupDialogSchemaLoading = true

      this.schema().then(() => {
        setTimeout(() => {
          if (!this.createGroupDialogLoaded) {
            this.createGroupDialogLoaded = true
          }

          this.$nextTick(() => {
            this.$refs.createGroupDialog.showDialog = true
            this.createGroupDialogSchemaLoading = false
          })
        }, 100)
      })
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

  :global(.handle) {
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M0 7.5v5h50v-5H0zm0 15v5h50v-5H0zm0 15v5h50v-5H0z" color="%23000"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    // opacity: 0.25;
    cursor: move;
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
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

  .actions {
    margin: 10px 0;
  }

  .list {
    // $r: &;
    // #{$r}__group {}

    &__group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      justify-content: flex-start;

      &__header {
        background: #f5f7fa;
        padding: 15px;
        border-bottom: 1px solid #ebeef5;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__tree {
        height: 280px;
        overflow-y: scroll;
      }

      &__update {
        margin-top: 10px;
      }

      &__info {
        display: flex;
      }

      &__remove {
        padding: 7px;
        width: 30px;
        height: 30px;

        & svg {
          width: 14px;
          height: 14px;
        }
      }

      &__body {
        padding: 10px;
      }

      &__item {
        position: relative;
        display: block;
        padding: 0;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        height: 100%;
        width: calc(33.3% - 5px);
        margin-right: 5px;
        margin-bottom: 5px;

        &:global(.ghost) {
          border: 1px dashed #0088f8;
          background: rgba(0, 136, 249, 0.09);

          & > div {
            opacity: 0;
          }
        }
      }
    }
  }
}
</style>
