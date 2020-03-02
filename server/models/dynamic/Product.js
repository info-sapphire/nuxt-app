const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  created: {
    user: { type: Schema.ObjectId, ref: 'User' },
    date: {
      type: Date,
      default: Date.now
    }
  },
  updated: [
    {
      user: { type: Schema.ObjectId, ref: 'User' },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

module.exports = model('Product', schema)
