<template>
  <div :class="$style.wrapper">
    <AppButton
      type="success"
      size="mini"
      @click="OPEN_DIALOG('createGroup')"
    >
      Добавить группу
    </AppButton>
    <AppCreateGroup
      ref="createGroup"
      :position="lastPosition"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AppCreateGroup from '~/components/groups/AppCreateGroup'
import AppButton from '~/components/elements/button/AppButton'

export default {
  components: {
    AppCreateGroup,
    AppButton
  },

  computed: {
    ...mapGetters('groups', ['groups']),

    lastPosition() {
      return this.groups.length > 0 ? this.groups.length + 1 : 1
    }
  },

  methods: {
    ...mapMutations('app', ['OPEN_DIALOG'])
  }
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 10px 0;
}
</style>
