var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingPrimerSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  displayorder: { type: String, required: true },
  price: { type: Number, required: true }
})

var roofingPrimer = mongoose.model('RoofingPrimer', RoofingPrimerSchema)
module.exports = roofingPrimer
