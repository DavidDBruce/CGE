var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var TapemeasuresSchema = new Schema({
   _id: { type: Number, required: true },
    name:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isDeleted:{type: Boolean, required: true , default:false}

})

var tapemeasures = mongoose.model('Tapemeasures', TapemeasuresSchema)
module.exports = tapemeasures

