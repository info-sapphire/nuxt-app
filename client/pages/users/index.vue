<template>
  <div :class="$style.wrapper">
    <AppPageHeadline
      :breadcrumbs="breadcrumbs"
      :name="page.name"
    />
    <div :class="$style.wrapper__actions">
      <Component
        :is="action.component"
        v-for="(action, index) in actions"
        :key="index"
        v-bind="action.props"
        v-on="action.emits"
      >
        {{ action.slot }}
      </Component>
    </div>
    <div
      ref="wrapperInner"
      :class="$style.wrapper__inner"
    >
      <AppUsersList
        ref="usersList"
        :max-height="contentHeight"
      />
    </div>
  </div>
</template>

<script>
import AppPageHeadline from '~/components/elements/page-headline/AppPageHeadline'
import AppUsersList from '~/components/users/AppUsersList'
import AppButton from '~/components/elements/button/AppButton'

export default {
  components: {
    AppPageHeadline,
    AppUsersList,
    AppButton
  },

  data: () => ({
    page: {
      name: 'Пользователи'
    },

    contentHeight: 0,

    breadcrumbs: [{ name: 'Пользователи', link: '' }]
  }),

  computed: {
    actions() {
      return [
        {
          component: 'AppButton',
          slot: 'Добавить пользователя',
          props: {
            type: 'success',
            size: 'mini'
          },
          emits: { click: this.createUser }
        }
      ]
    }
  },

  mounted() {
    this.contentHeight = this.$refs.wrapperInner.offsetHeight
  },

  methods: {
    createUser() {
      this.$router.push('/users/create')
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__actions {
    margin: 10px 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  }
}
</style>
