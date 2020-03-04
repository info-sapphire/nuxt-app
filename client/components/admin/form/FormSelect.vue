<template>
  <ElFormItem
    :prop="prop"
    :label="label"
  >
    <ElSelect
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
      @input="updateValue"
    >
      <ElOption
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script>
export default {
  name: 'FormSelect',

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
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
