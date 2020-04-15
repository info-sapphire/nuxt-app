<template>
  <ElPopover
    v-model="lazyValue"
    placement="top"
    :width="width"
    :class="$style.popover"
  >
    <p :class="$style.popover__text">
      Вы действительно <br v-if="!hideBreak">
      хотите удалить {{ title }}?
    </p>
    <div :class="$style.popover__wrap">
      <ElButton
        size="mini"
        type="text"
        @click="closePopover"
      >
        отмена
      </ElButton>
      <ElButton
        type="primary"
        size="mini"
        @click="$emit('click')"
      >
        да
      </ElButton>
    </div>
    <AppButton
      slot="reference"
      size="mini"
      type="danger"
      :loading="loading"
      :class="$style.popover__remove"
    >
      <AwesomeIcon :name="'trash-alt'" />
    </AppButton>
  </ElPopover>
</template>

<script>
import AppButton from '~/components/elements/button/AppButton'

export default {
  components: {
    AppButton
  },

  props: {
    value: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    width: {
      type: Number,
      default: 180
    },

    hideBreak: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    lazyValue: false
  }),

  watch: {
    value(value) {
      this.lazyValue = value
    }
  },

  methods: {
    closePopover() {
      this.lazyValue = false
    }
  }
}
</script>

<style lang="scss" module>
.popover {
  &__text {
  }

  &__wrap {
    text-align: right;
    margin: 0;
  }

  &__remove {
    padding: 7px;
    width: 30px;
    height: 30px;

    & svg {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
