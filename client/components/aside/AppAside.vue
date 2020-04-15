<template>
  <ElMenu
    router
    :class="$style.menu"
    :default-active="$route.path"
    :background-color="'#272a33'"
    :text-color="'#fff'"
    :active-text-color="colorPrimary"
  >
    <ElMenuItem index="/">
      <AwesomeIcon
        :class="$style.menu__icon"
        :name="'chart-network'"
      />
      <span>Аналитика</span>
    </ElMenuItem>
    <ElMenuItem index="/uploads/">
      <AwesomeIcon
        :class="$style.menu__icon"
        :name="'photo-video'"
      />
      <span>Медиафайлы</span>
    </ElMenuItem>
    <!-- <ElMenuItem index="/languages">
      <AwesomeIcon
        :class="$style.menu__icon"
        :name="'language'"
      />
      <span>Языки</span>
    </ElMenuItem> -->
    <ElSubmenu index="/users">
      <template slot="title">
        <AwesomeIcon
          :class="$style.menu__icon"
          :name="'users'"
        />
        <span>Пользователи</span>
      </template>
      <ElMenuItem index="/users/">
        <AwesomeIcon
          :class="$style.menu__icon"
          :name="'poll-people'"
        />
        <span>Список</span>
      </ElMenuItem>
      <ElMenuItem index="/users/groups">
        <AwesomeIcon
          :class="$style.menu__icon"
          :name="'users-crown'"
        />
        <span>Группы</span>
      </ElMenuItem>
    </ElSubmenu>
    <ElMenuItem index="/settings">
      <AwesomeIcon
        :class="$style.menu__icon"
        :name="'cogs'"
      />
      <span>Настройки</span>
    </ElMenuItem>
  </ElMenu>
</template>

<script>
export default {
  name: 'AppAside',

  data: () => ({
    colorPrimary: '#ee4070'
  })
}
</script>

<style lang="scss" module>
@import 'assets/scss/_vars';

.menu {
  $menu: &;

  height: 100%;

  :global(.el-menu-item.is-active) {
    #{$menu}__icon {
      color: $color-primary;
    }
  }

  :global(.el-submenu.is-active .el-submenu__title) {
    color: $color-primary !important;
    border-bottom-color: transparent;

    #{$menu}__icon {
      color: $color-primary;
    }
  }

  &__icon {
    color: #909399;
    width: 20px;
    height: 20px;
    margin: 0 4px 0 1px;
  }
}
</style>
