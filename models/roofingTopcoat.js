//DevTeam ID (P3-8)
//Dev1 : Swaroop Gembali [S528802]
//Dev2 : Tarun Kumar Potlapalli [S528757]


var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingTopcoatSchema = new Schema({
   _id: { type: Number, required: true },
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true }
})

var roofingTopcoat = mongoose.model('RoofingTopcoat', RoofingTopcoatSchema)
module.exports = roofingTopcoat
