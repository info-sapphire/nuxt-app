<template>
  <ElFormItem
    :prop="prop"
    :label="label"
    :class="$style.item"
  >
    <ElInput
      :value="value"
      :class="$style.input"
      v-on="$listeners"
      @input="updateValue"
    >
      <ElColorPicker
        slot="append"
        v-bind="$attrs"
        :value="value"
        :class="$style.picker"
        @input="updateValue"
      />
    </ElInput>
  </ElFormItem>
</template>

<script>
export default {
  name: 'FormColorPicker',

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

  methods: {
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" module>
.item {
  max-width: 250px;

  .input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    :global(.el-input-group__append) {
      padding: 0;
      width: auto;
      height: 40px;

      .picker {
        :global(.el-color-picker__trigger) {
          height: 38px;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }
      }
    }
  }
}
</style>
