import Vue from 'vue'
import { Container, Aside, Main } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
