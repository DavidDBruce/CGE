var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var HammerSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  displayorder: { type: String, required: true },
  price: { type: Number, required: true },
  isActive:{type: Boolean, required: true, default:true }
})

var hammer = mongoose.model('hammer', HammerSchema)
module.exports = hammer