<template>
  <ElDialog
    :visible.sync="showDialog"
    :show-close="false"
    :close-on-click-modal="false"
    :class="$style.dialog"
  >
    <div
      slot="title"
      :class="$style.dialog__title"
    >
      <span class="el-dialog__title">
        <slot name="title" />
      </span>
      <AwesomeIcon
        :name="'times'"
        :class="$style.dialog__close"
        @click="closeDialog"
      />
    </div>
    <slot />
  </ElDialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    showDialog() {
      return this.$store.state.app[this.name]
    }
  },

  methods: {
    ...mapMutations('app', ['CLOSE_DIALOG']),
    closeDialog() {
      this.CLOSE_DIALOG(this.name)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" module>
.dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  & > :global(.el-dialog) {
    margin: 0 !important;
    width: 100%;
    max-width: 600px;

    & > :global(.el-dialog__header) {
      padding-bottom: 0;
    }

    & > :global(.el-dialog__body) {
      padding: 0;
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__close {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
}
</style>
