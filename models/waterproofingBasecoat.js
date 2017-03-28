//Dev Team-p4-6
//Test Team-P1-12
//Jyothsna Pala-S528755
//Bhavishya Arelli-S528743
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var WaterproofingBasecoatSchema = new Schema({
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true }
})

var waterproofingBasecoat = mongoose.model('WaterproofingBasecoat', WaterproofingBasecoatSchema)
module.exports = waterproofingBasecoat

