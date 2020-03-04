module.exports = {
  BASE_API_URL: '/api/',
  thumbnail: {
    width: 100,
    height: 100
  },
  mimetype: {
    images: ['image/jpeg', 'image/png'],
    other: []
  },
  dirName: /[a-z0-9_]+$/,
  uploadDir: ['..', '..', 'client', 'static', 'uploads'],
  components: [
    { name: 'input', component: 'FormInput' },
    { name: 'color-picker', component: 'FormColorPicker' },
    { name: 'select', component: 'FormSelect' }
  ],
  schema: {
    component: '',
    value: '',
    label: '',
    options: [],
    props: {},
    on: {}
  }
}
