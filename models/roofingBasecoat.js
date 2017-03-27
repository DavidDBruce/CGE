//P3-12; Benjamin Wolff, Nagnath Gokuldas Prabhu

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingBasecoatSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  displayorder: { type: String, required: true },
  price: { type: Number, required: true }
})

var roofingBasecoat = mongoose.model('RoofingBasecoat', RoofingBasecoatSchema)
module.exports = roofingBasecoat
