module.exports = {
  BASE_API_URL: '/api/',
  thumbnail: {
    width: 300,
    height: 300
  },
  mimetype: {
    images: ['image/jpeg', 'image/png'],
    other: []
  },
  dirName: /[a-z0-9_]+$/,
  uploadDir: ['..', '..', 'client', 'static', 'uploads'],
  components: [
    { name: 'input', component: 'FormInput', type: String },
    { name: 'input-media', component: 'FormMediaInput', type: String },
    { name: 'password', component: 'FormPassword', type: String },
    { name: 'color-picker', component: 'FormColorPicker', type: String },
    { name: 'select', component: 'FormSelect', type: Array }
  ],
  schema: {
    component: '',
    value: '',
    label: '',
    options: [],
    props: {},
    on: {}
  },
  roles: [
    { name: 'ADMIN_VIEW', description: 'Просмотр панели администратора' },
    { name: 'DEVELOPER', description: 'Разработчик' },
    { name: 'DEMO', description: 'Демо' },
    { name: 'SETTINGS_VIEW', description: 'Просмотр секции настроек' },
    { name: 'SETTINGS_UPDATE', description: 'Редактирование настроек' },
    { name: 'SETTINGS_CREATE', description: 'Добавление настроек' }
  ]
}
