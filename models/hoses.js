var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var HosesSchema = new Schema({
   _id: { type: Number, required: true },
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isActive:{type: Boolean, required: true , default:true}

})

var hoses = mongoose.model('hoses', HosesSchema)
module.exports = hoses
