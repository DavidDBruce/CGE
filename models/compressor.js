var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var compressorSchema = new Schema({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  
  displayorder: { type: Number, required: true },
  price: { type: Number, required: true },
  isdeleated : { type : Boolean , required : true }
})

var compressor = mongoose.model('compressor', compressorSchema)
module.exports = compressor
// Team Compressor (Venkatesh Darshan Yadav,Kolla Venkata Naveen Kumar, Kamareddy Srinithya )