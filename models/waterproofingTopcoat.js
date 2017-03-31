//dev team ID(P4-9),Srinithya Kamareddy(S528740),Varsha Basawapuram(S528735)
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var WaterproofingTopcoatSchema = new Schema({
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true }
})

var waterproofingTopcoat = mongoose.model('WaterproofingTopcoat', WaterproofingTopcoatSchema)
module.exports = waterproofingTopcoat

