<template>
  <ElFormItem
    :prop="prop"
    :label="label"
  >
    <ElInput
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      @input="updateValue"
    >
      <ElButton
        slot="append"
        @click="openMediaFiles"
      >
        <AwesomeIcon :name="'photo-video'" />
      </ElButton>
    </ElInput>
    <ElDialog
      :visible.sync="showDialog"
      :lock-scroll="true"
      :show-close="false"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :append-to-body="true"
      top="0"
      class="dialog"
    >
      <template slot="title">
        <UploadHeader
          :show-close="true"
          @close="closeMediaFiles"
        />
      </template>
      <AppUpload @select="chooseMediaFiles" />
      <div slot="footer">
        <span
          v-if="error.length"
          class="dialog__error"
        >
          {{ error }}
        </span>
        <ElButton
          type="primary"
          @click="selectMediaFiles"
        >
          Выбрать
        </ElButton>
      </div>
    </ElDialog>
  </ElFormItem>
</template>

<script>
import AppUpload from '~/components/upload/AppUpload'
import UploadHeader from '~/components/upload/elements/UploadHeader'

export default {
  name: 'FormMediaInput',

  components: {
    AppUpload,
    UploadHeader
  },

  props: {
    prop: {
      type: String,
      required: true
    },

    label: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      required: true
    },

    options: {
      type: Array,
      default: () => {}
    }
  },

  data: () => ({
    showDialog: false,
    path: null,
    error: ''
  }),

  methods: {
    updateValue(value) {
      this.$emit('input', value)
    },

    openMediaFiles() {
      this.showDialog = true
    },

    closeMediaFiles() {
      this.showDialog = false
    },

    chooseMediaFiles(path) {
      this.path = path
    },

    selectMediaFiles() {
      this.error = ''

      if (this.path !== null) {
        this.updateValue(this.path)
        this.closeMediaFiles()
      } else {
        this.error = 'Выберите медиафайл!'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input-group--append {
  .el-input-group__append {
    padding: 0;
    .el-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 60px;
      margin: 0;
      border-width: 0px;
      padding: 9px 0;

      .awesome-icon {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.dialog {
  padding: 30px;
  overflow: hidden;

  &__error {
    display: inline-block;
    color: #f56c6c;
    font-size: 12px;
    margin-right: 8px;
  }

  /deep/ .el-dialog {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .el-dialog__header {
      width: 100%;
      min-height: 70px;
    }

    .el-dialog__body {
      max-height: calc(100% - 70px - 73px);
      padding: 0 20px 0;
      flex-grow: 1;
    }

    .el-dialog__footer {
      width: 100%;
      min-height: 73px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ebeef5;
      padding: 15px 20px;

      .el-button {
        width: auto;
      }
    }
  }
}
</style>
