<template>
  <div :class="$style.wrapper">
    <ElDivider content-position="left">
      Языки
    </ElDivider>
    <div :class="$style.breadcrumb">
      <div :class="$style.breadcrumb__item">
        homepage
      </div>
      <div :class="$style.breadcrumb__separator">
        /
      </div>
      <div :class="$style.breadcrumb__item">
        <NuxtLink
          :class="$style.breadcrumb__link"
          to="/settings"
        >
          promotion management
        </NuxtLink>
      </div>
      <div :class="$style.breadcrumb__separator">
        /
      </div>
      <div :class="$style.breadcrumb__item">
        promotion list
      </div>
      <div :class="$style.breadcrumb__separator">
        /
      </div>
      <div :class="$style.breadcrumb__item">
        promotion detail
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin'
}
</script>

<style lang="scss" module>
.wrapper {
  :global(.el-divider__text) {
    font-size: 18px;
    padding: 0 15px;
  }
}
.breadcrumb {
  display: flex;
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  color: #777;
  background-color: #f5f5f5;
}

.breadcrumb__link {
  color: #ee4070;
}

.breadcrumb__separator {
  padding: 0 5px;
}
</style>
