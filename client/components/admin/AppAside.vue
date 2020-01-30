<template>
  <ElMenu
    router
    class="aside-menu"
    :default-active="$route.path"
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
    <ElMenuItem index="/admin/logout">
      <i class="el-icon-setting" />
      <span>Выйти</span>
    </ElMenuItem>
  </ElMenu>
</template>

<script>
export default {
  name: 'AppAside'
}
</script>

<style lang="scss" scoped>
.aside-menu {
  // height: 100%;
}
</style>
