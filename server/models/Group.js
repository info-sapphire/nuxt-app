const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  description: { type: String },
  position: { type: Number, default: 1 },
  roles: [{ type: String }]
})

module.exports = model('Group', schema)
