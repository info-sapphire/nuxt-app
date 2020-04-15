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
      <!-- Hack for Awesome Icon -->
      <Component
        :is="option.component"
        v-for="option in options"
        :key="option.component"
        v-bind="option.props"
      />
    </ElInput>
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
