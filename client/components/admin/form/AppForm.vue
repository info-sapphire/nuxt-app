<template>
  <ElCard
    shadow="never"
    :class="$style.wrapper"
  >
    <ElForm
      ref="form"
      :class="$style.form"
      :model="value"
      :rules="rules"
    >
      <Component
        :is="item.component"
        v-for="(item, index) in schema"
        :key="index"
        v-model="value[index]"
        :prop="index"
        :label="item.label"
        v-bind="item.props"
        v-on="item.on"
      />
      <ElButton
        type="primary"
        :class="$style.button"
        @click="onSubmit"
      >
        SUBMIT
      </ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import FormInput from '~/components/admin/form/FormInput'
import FormColorPicker from '~/components/admin/form/FormColorPicker'

export default {
  name: 'AppForm',

  components: {
    FormInput,
    FormColorPicker
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    schema: {
      type: Object,
      required: true
    },

    rules: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.value)
        }
      })
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
