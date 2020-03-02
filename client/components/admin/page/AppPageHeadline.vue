<template>
  <div :class="$style.wrapper">
    <ElDivider content-position="left">
      {{ name }}
    </ElDivider>
    <div
      v-if="breadcrumbs.length > 0"
      :class="$style.breadcrumb"
    >
      <template v-for="(breadcrumb, index) in breadcrumbs">
        <div
          :key="`breadcrumb-${index}`"
          :class="$style.breadcrumb__item"
        >
          <Component
            :is="breadcrumb.link.length > 0 ? 'AppLink' : 'span'"
            :to="breadcrumb.link"
            :class="breadcrumb.link.length > 0 ? $style.breadcrumb__link : ''"
          >
            {{ breadcrumb.name }}
          </Component>
        </div>
        <div
          v-show="index < breadcrumbs.length - 1"
          :key="`separator-${index}`"
          :class="$style.breadcrumb__separator"
        >
          /
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AppLink from '~/components/admin/elements/AppLink'

export default {
  name: 'AppPageHeadline',

  components: {
    AppLink
  },

  props: {
    name: {
      type: String,
      required: true
    },

    breadcrumbs: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

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
  color: $color-primary;
}

.breadcrumb__separator {
  padding: 0 5px;
}
</style>
