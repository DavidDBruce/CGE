<<<<<<< HEAD
//P3-12; Benjamin Wolff, Nagnath Gokuldas Prabhu
=======
//devteam ID (P3-7) Amarendar Reddy Reddygari (s528760), Connor Besancenez (s519984) are going to work on Roofing basecoats.
>>>>>>> ce79da4b892df3ace5f7865857a18a99946f4419

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
