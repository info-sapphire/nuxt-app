<template>
  <ElFormItem
    :prop="prop"
    :label="label"
    :class="$style.item"
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

<style lang="scss" module>
.item {
  display: flex;
  flex-direction: column;

  :global(.el-form-item__label) {
    text-align: left;
  }

  :global(.el-select) {
    min-width: 250px;
  }
}
</style>
