// Author: Mathew Horner
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var NozzleSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  displayorder: { type: String, required: true },
  price: { type: Number, required: true },
  isActive:{type: Boolean, required: true, default:true }
})

var nozzle = mongoose.model('Nozzle', NozzleSchema)
module.exports = nozzle
