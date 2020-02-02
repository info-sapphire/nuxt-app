// https://github.com/FortAwesome/vue-fontawesome#nuxtjs
// https://fontawesome.com/icons
/*
  fas - solid
  far - regular
  fal - light
  fab - brands
*/
import Vue from 'vue'
import {
  aILanguage,
  aICogs,
  aIChartNetwork
} from '@/assets/awesome-icons/light'

const icons = [aILanguage, aICogs, aIChartNetwork]

Vue.component('AwesomeIcon', {
  name: 'AwesomeIcon',

  functional: true,

  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },

  render: (createElement, context) => {
    let {
      data,
      props: { name, width, height }
    } = context

    const icon = icons.find(icon => icon.iconName === name)

    if (!icon) {
      console.warn('Icon not found')
      return null
    }

    width = !width ? icon.width : width
    height = !height ? icon.height : height

    return createElement(
      'svg',
      {
        staticClass: data.staticClass,
        class: data.class,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: `${width}px`,
          height: `${height}px`,
          viewBox: `0 0 ${icon.width} ${icon.height}`
        }
      },
      [createElement('path', { attrs: { fill: 'currentColor', d: icon.path } })]
    )
  }
})
