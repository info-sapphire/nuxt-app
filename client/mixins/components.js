import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      component: state => state.settings.schema,
      components: state => state.settings.components
    }),

    verifyComponents() {
      return this.components !== null
        ? this.components.map(item => item.component)
        : false
    }
  }
}
