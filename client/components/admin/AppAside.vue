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
      <AwesomeIcon
        :class="$style.icon"
        :name="'chart-network'"
      />
      <span>Аналитика</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/uploads">
      <AwesomeIcon
        :class="$style.icon"
        :name="'photo-video'"
      />
      <span>Медиафайлы</span>
    </ElMenuItem>
    <ElMenuItem index="/admin/languages">
      <AwesomeIcon
        :class="$style.icon"
        :name="'language'"
      />
      <span>Языки</span>
    </ElMenuItem>
    <ElSubmenu index="/admin/users">
      <template slot="title">
        <AwesomeIcon
          :class="$style.icon"
          :name="'users'"
        />
        <span>Пользователи</span>
      </template>
      <ElMenuItem index="/admin/users">
        <AwesomeIcon
          :class="$style.icon"
          :name="'poll-people'"
        />
        <span>Список</span>
      </ElMenuItem>
      <ElMenuItem index="/admin/users/groups">
        <AwesomeIcon
          :class="$style.icon"
          :name="'users-crown'"
        />
        <span>Группы</span>
      </ElMenuItem>
    </ElSubmenu>
    <ElMenuItem index="/admin/settings">
      <AwesomeIcon
        :class="$style.icon"
        :name="'cogs'"
      />
      <span>Настройки</span>
    </ElMenuItem>
  </ElMenu>
</template>

<script>
export default {
  name: 'AppAside'
}
</script>

<style lang="scss" module>
.menu {
  height: 100%;
}

.icon {
  color: #909399;
  width: 20px;
  height: 20px;
  margin: 0 4px 0 1px;
}

:global(.el-menu-item.is-active) {
  .icon {
    color: #ee4070;
  }
}
</style>
