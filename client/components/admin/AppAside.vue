<template>
  <ElMenu
    router
    :class="$style.menu"
    :default-active="$route.path"
    :background-color="'#272a33'"
    :text-color="'#fff'"
    :active-text-color="'#ee4070'"
  >
    <ElMenuItem index="/admin">
      <i class="el-icon-menu" />
      <span>Аналитика</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/create">
      <i class="el-icon-edit-outline" />
      <span>Создать пост</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/list">
      <i class="el-icon-tickets" />
      <span>Посты</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/user">
      <i class="el-icon-user" />
      <span>Создать пользователя</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/user">
      <LanguagesIcon
        width="18px"
        height="18px"
      />
      <span>Языки</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/logout">
      <i class="el-icon-setting" />
      <span>Выйти</span>
    </ElMenuItem>
  </ElMenu>
</template>

<script>
import LanguagesIcon from '~/assets/icons/languages.svg'

export default {
  name: 'AppAside',
  components: {
    LanguagesIcon
  }
}
</script>

<style lang="scss" module>
.menu {
  height: 100%;
}

// fill: #909399;
// margin: 0 4px 0 1px;
</style>
