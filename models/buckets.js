//P2-10 Jordan Nazario

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var BucketSchema = new Schema({
    _id: { type: Number, required: true },
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isActive:{type: Boolean, required: true , default:true}
})

var prospect = mongoose.model('Bucket', BucketSchema)
module.exports = bucket
