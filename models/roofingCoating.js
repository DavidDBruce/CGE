var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingCoatingSchema = new Schema({
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true }
})

var roofingCoating = mongoose.model('RoofingCoating', RoofingCoatingSchema)
module.exports = roofingCoating