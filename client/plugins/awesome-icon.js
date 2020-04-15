// https://github.com/FortAwesome/vue-fontawesome#nuxtjs
// https://fontawesome.com/icons
/*
  fas - solid
  far - regular
  fal - light
  fab - brands
*/
import Vue from 'vue'

import aILanguage from '@/assets/awesome-icons/light/aILanguage'
import aICogs from '@/assets/awesome-icons/light/aICogs'
import aIChartNetwork from '@/assets/awesome-icons/light/aIChartNetwork'
import aILockAlt from '@/assets/awesome-icons/light/aILockAlt'
import aIUser from '@/assets/awesome-icons/light/aIUser'
import aIEye from '@/assets/awesome-icons/light/aIEye'
import aIEyeSlash from '@/assets/awesome-icons/light/aIEyeSlash'
import aIPhotoVideo from '@/assets/awesome-icons/light/aIPhotoVideo'
import aITrashAlt from '@/assets/awesome-icons/light/aITrashAlt'
import aITimes from '@/assets/awesome-icons/light/aITimes'
import aIUsers from '@/assets/awesome-icons/light/aIUsers'
import aIUsersCrown from '@/assets/awesome-icons/light/aIUsersCrown'
import aIPollPeople from '@/assets/awesome-icons/light/aIPollPeople'
import aICheck from '@/assets/awesome-icons/light/aICheck'
import aIMinus from '@/assets/awesome-icons/light/aIMinus'
import aIUserEdit from '@/assets/awesome-icons/light/aIUserEdit'

const icons = [
  aILanguage,
  aICogs,
  aIChartNetwork,
  aILockAlt,
  aIUser,
  aIEye,
  aIEyeSlash,
  aIPhotoVideo,
  aITrashAlt,
  aITimes,
  aIUsers,
  aIUsersCrown,
  aIPollPeople,
  aICheck,
  aIMinus,
  aIUserEdit
]

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

  render: (h, context) => {
    let {
      data,
      props: { name, width, height }
    } = context

    const icon = icons.find(icon => icon.iconName === name)

    if (!icon) {
      console.warn(`Icon '${name}' not found`)
      return null
    }

    width = !width ? icon.width : width
    height = !height ? icon.height : height
    const staticClass =
      'awesome-icon' + (!data.staticClass ? '' : ' ' + data.staticClass)

    return h(
      'svg',
      {
        staticClass,
        class: data.class,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: `${width}px`,
          height: `${height}px`,
          viewBox: `0 0 ${icon.width} ${icon.height}`
        },
        on: context.data.on
      },
      [h('path', { attrs: { fill: 'currentColor', d: icon.path } })]
    )
  }
})
