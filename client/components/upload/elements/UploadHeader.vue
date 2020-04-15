<template>
  <div class="upload-header">
    <div class="upload-header__left">
      <h1 class="upload-header__headline">
        Библиотека файлов
      </h1>
      <!-- <ElButton
        type="primary"
        size="mini"
        class="upload-header__button"
        @click="$emit('click')"
      >
        Добавить
      </ElButton> -->
    </div>
    <div class="upload-header__right">
      <AwesomeIcon
        v-if="showClose"
        :name="'times'"
        class="upload-header__close"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showClose: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-header {
  $upload: &;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    #{$upload}__headline {
      margin: 0;
      font-size: 28px;
    }

    #{$upload}__button {
      width: auto !important;
      margin-left: 12px;
    }
  }

  &__right {
    #{$upload}__close {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
</style>
