<script>
export default {
  name: 'AppLink',

  functional: true,

  props: {
    to: {
      type: String,
      required: true
    }
  },

  render (h, context) {
    const {
      data,
      props: { to }
    } = context

    return h(
      'nuxt-link',
      {
        props: { to },
        staticClass: data.staticClass,
        class: data.class
      },
      context.slots().default
    )
  }
}
</script>
