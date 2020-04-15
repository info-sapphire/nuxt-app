<template>
  <ElFormItem
    :prop="prop"
    :label="label"
  >
    <ElInput
      :value="value"
      v-bind="$attrs"
      :type="passwdType"
      class="el-input--password"
      v-on="$listeners"
      @input="updateValue"
    >
      <!-- Hack for Awesome Icon -->
      <Component
        :is="option.component"
        v-for="option in options"
        :key="option.component"
        v-bind="option.props"
      />
      <AwesomeIcon
        slot="suffix"
        :key="passwdIcon"
        :name="passwdIcon"
        @click="showPasswd"
      />
    </ElInput>
  </ElFormItem>
</template>

<script>
export default {
  name: 'FormPassword',

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
    passwdView: false,
    passwdType: 'password'
  }),

  computed: {
    passwdIcon() {
      return this.passwdView ? 'eye-slash' : 'eye'
    }
  },

  methods: {
    showPasswd() {
      this.passwdView = !this.passwdView
      this.passwdType = this.passwdView ? 'text' : 'password'
    },

    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  &--password {
    /deep/ .el-input__suffix {
      width: 25px;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-input__suffix-inner {
        display: flex;

        .awesome-icon {
          cursor: pointer;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>
