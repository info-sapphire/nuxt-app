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
        v-for="item in components"
        :key="item.name"
        v-model="value[item.name]"
        :prop="item.name"
        :label="item.label"
        :options="item.options"
        v-bind="item.props"
        v-on="item.on"
      />
      <AppButton
        v-for="action in actions"
        :key="action.emit"
        :type="action.type"
        :loading="action.loading"
        @click="onEmit(action)"
      >
        {{ action.name }}
      </AppButton>
      <span
        v-if="error.length > 0"
        :class="$style.form__error"
      >
        {{ error }}
      </span>
    </ElForm>
  </ElCard>
</template>

<script>
import FormInput from '~/components/admin/form/FormInput'
import FormColorPicker from '~/components/admin/form/FormColorPicker'
import FormSelect from '~/components/admin/form/FormSelect'
import FormSelectValue from '~/components/admin/form/FormSelectValue'
import AppButton from '~/components/admin/elements/button/AppButton'

export default {
  name: 'AppForm',

  components: {
    FormInput,
    FormColorPicker,
    FormSelect,
    AppButton,
    FormSelectValue
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
    },

    actions: {
      type: Array,
      default: () => {}
    },

    error: {
      type: String,
      default: ''
    }
  },

  computed: {
    components () {
      return Object.entries(this.schema)
        .reduce((components, component) => {
          const [name, schema] = component

          if (schema !== null) {
            components.push({
              ...schema,
              name
            })
          }

          return components
        }, [])
        .sort((prev, next) => prev.position - next.position)
    }
  },

  methods: {
    onEmit (action) {
      if (action.validate) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit(action.emit, action.emit)
          }
        })
      } else {
        this.$emit(action.emit, action.emit)
      }
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);

  .form {
    &__error {
      color: #f56c6c;
      font-size: 12px;
    }
  }
}
</style>
