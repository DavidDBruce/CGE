//Team rollers
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var tapesSchema = new Schema({
   _id: { type: Number, required: true },
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isActive:{type: Boolean, required: true , default:true}

})

var tape = mongoose.model('Tape', tapesSchema)
module.exports = tape