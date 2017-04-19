var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var BroomSchema = new Schema({
   _id: { type: Number, required: true },
    name:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isDelete:{type: Boolean, required: true , default:true}

})

var broom = mongoose.model('Broom', BroomSchema)
module.exports = broom