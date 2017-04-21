var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var hammer = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  status:{type: String, required: true },
  displayorder: { type: String, required: true },
  price: { type: Number, required: true },
  isActive:{type: Boolean, required: true, default:true }
})

var hammer = mongoose.model('hammer', hammer)
module.exports = hammer
