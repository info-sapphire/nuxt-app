<template>
  <div
    :class="[$style.item, { [$style['item--active']]: active }]"
    @click="$emit('click')"
  >
    <div :class="$style.item__inner">
      <AwesomeIcon
        :name="'check'"
        :class="[$style.item__icon, $style['item__icon--check']]"
      />
      <AwesomeIcon
        :name="'minus'"
        :class="[$style.item__icon, $style['item__icon--minus']]"
      />
    </div>
    <div :class="$style.item__wrap">
      <img
        draggable="false"
        :src="path"
        :class="$style.item__image"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },

    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.item {
  $item: &;

  cursor: pointer;
  border: 4px solid transparent;
  position: relative;

  &--active {
    border-color: $color-primary;

    #{$item}__inner {
      display: flex;
    }
  }

  &__inner {
    display: none;
    width: 25px;
    height: 25px;
    justify-content: center;
    align-items: center;
    background-color: #ee4070;
    border: 1.5px solid #ee4070;
    box-shadow: inset 0px 0px 0px 1px #fff;
    position: absolute;
    top: -12px;
    right: -12px;
    cursor: pointer;

    #{$item}__icon {
      width: 15px;
      height: 15px;
      color: #fff;

      &--check {
        display: block;
      }

      &--minus {
        display: none;
      }
    }

    &:hover {
      #{$item}__icon--check {
        display: none;
      }

      #{$item}__icon--minus {
        display: block;
      }
    }
  }

  &__wrap {
    padding: 1px;

    #{$item}__image {
      display: block;
      width: 100%;
      user-select: none;
    }
  }
}
</style>
