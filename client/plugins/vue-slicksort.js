/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import { ContainerMixin, ElementMixin } from 'vue-slicksort'

Vue.component('SortableList', {
  mixins: [ContainerMixin],
  render(h) {
    return h('ul', { class: 'list' }, this.$slots.default)
  }
})

Vue.component('SortableItem', {
  mixins: [ElementMixin],
  props: { item: { type: String, default: '' } },
  render(h) {
    return h(
      'li',
      { class: 'list-item' },
      this.item.length > 0 ? this.item : this.$slots.default
    )
  }
})
