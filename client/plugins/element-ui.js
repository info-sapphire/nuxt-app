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
  Submenu,
  MenuItem,
  Divider,
  ColorPicker,
  Dialog,
  Select,
  Option,
  Checkbox,
  Table,
  TableColumn,
  Tree,
  Popover,
  Message
  // Collapse,
  // CollapseItem
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
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Divider)
Vue.use(ColorPicker)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tree)
Vue.use(Popover)
// Vue.use(Collapse)
// Vue.use(CollapseItem)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
