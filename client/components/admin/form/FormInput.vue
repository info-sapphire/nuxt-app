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
    />
  </ElFormItem>
</template>

<script>
export default {
  name: 'FormInput',

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
    }
  },

  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
