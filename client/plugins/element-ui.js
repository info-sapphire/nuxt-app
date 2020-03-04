import Vue from 'vue'
import {
  Loading,
  Container,
  Header,
  Aside,
  Main,
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Menu,
  MenuItem,
  Divider,
  ColorPicker,
  Dialog,
  Select,
  Option
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Divider)
Vue.use(ColorPicker)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
