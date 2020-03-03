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
  schema: {
    component: '',
    value: '',
    label: '',
    props: {},
    on: {}
  }
}
