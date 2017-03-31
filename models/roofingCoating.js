// Dev Team P3-6
// Neeraja Garigipati s528801
// Vaishnavi Kalvakota s528803
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingCoatingSchema = new Schema({
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
<<<<<<< HEAD
    isDeleted: { type: Boolean, required: false }
=======
    IsDeleted: { type: Boolean, required: true, default: false }
    
>>>>>>> 1e7dfb8630b0a8bf98d55cda148c01a949c3ecef
})

var roofingCoating = mongoose.model('RoofingCoating', RoofingCoatingSchema)
module.exports = roofingCoating