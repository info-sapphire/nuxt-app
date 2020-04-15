<template>
  <ElFormItem
    :prop="prop"
    :label="label"
    :class="$style.sortable"
  >
    <SortableList
      v-show="value.length > 0"
      :value="value"
      :use-drag-handle="true"
      lock-axis="y"
      :class="$style.sortable__list"
      @input="updateValue"
    >
      <SortableItem
        v-for="(item, index) in value"
        :key="index"
        :index="index"
        :class="$style.sortable__item"
      >
        <div :class="$style.value">
          <span
            v-handle
            :class="$style.sortable__handle"
          />
          <div :class="$style.sortable__wrap">
            <div :class="$style.sortable__inner">
              <ElInput
                v-model="item.label"
                placeholder="Название"
                :class="{ 'is-error': item.errorLabel }"
              />
              <ElInput
                v-model="item.value"
                placeholder="Значение"
                :class="{ 'is-error': item.errorValue }"
              />
              <ElButton
                type="danger"
                size="small"
                :class="$style.sortable__remove"
                @click="removeValue(index)"
              >
                <AwesomeIcon :name="'trash-alt'" />
              </ElButton>
            </div>
            <ElCheckbox
              v-model="item.checked"
              size="mini"
              @input="onChange(index, item.checked)"
            >
              Выбрать значением по умолчанию
            </ElCheckbox>
          </div>
        </div>
      </SortableItem>
    </SortableList>
    <AppButton
      type="success"
      size="small"
      @click="addValue"
    >
      Добавить
    </AppButton>
  </ElFormItem>
</template>

<script>
import { HandleDirective } from 'vue-slicksort'

import AppButton from '~/components/elements/button/AppButton'

export default {
  name: 'FormSelectValue',

  directives: { handle: HandleDirective },

  components: {
    AppButton
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
      type: Array,
      required: true
    },

    options: {
      type: Array,
      default: () => {}
    }
  },

  data: () => ({
    selected: 0
  }),

  methods: {
    addValue() {
      const value = this.value
      value.push({
        errorLabel: false,
        errorValue: false,
        label: '',
        value: '',
        checked: false
      })

      this.updateValue(value)
    },

    removeValue(index) {
      const value = this.value
      value.splice(index, 1)

      this.updateValue(value)
    },

    updateValue(value) {
      this.$emit('input', value)
    },

    onChange(index, state) {
      const value = this.value.map(item => {
        return {
          ...item,
          checked: false
        }
      })

      value[index].checked = state

      this.updateValue(value)
    }
  }
}
</script>

<style lang="scss" module>
.sortable {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  :global(.el-form-item__content) {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: inherit;
  }

  &__list {
    max-height: 306px;
    overflow-y: scroll;
    margin: 0 auto;
    list-style-type: none;
    padding: 0;
    overflow: auto;
    background-color: #f3f3f3;
    border: 1px solid #efefef;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #fff;
    box-sizing: border-box;
    user-select: none;
    color: #333;
    font-weight: 400;
    z-index: 5000;

    &:not(:last-child) {
      border-bottom: 1px solid #efefef;
    }
  }

  &__handle {
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M0 7.5v5h50v-5H0zm0 15v5h50v-5H0zm0 15v5h50v-5H0z" color="%23000"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.25;
    cursor: row-resize;
    display: block;
    width: 100%;
    max-width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  &__wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__inner {
    width: 100%;
    display: flex;
    margin-bottom: 8px;
  }

  &__remove {
    margin-left: 10px;
    border-radius: 4px;
    padding: 11px;

    & > span {
      display: block;
      width: 14px;
      height: 14px;

      & > svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.value {
  display: flex;
  align-items: center;
  width: 100%;

  :global(.el-input + .el-input) {
    margin-left: 10px;
  }
}
</style>
