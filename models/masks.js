// Author: Kenneth Mott
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var MaskSchema = new Schema({
  _id: { type: Number, required: true },
  _type: {type: String, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true }
})

var mask = mongoose.model('Mask', NozzleSchema)
module.exports = nozzle
