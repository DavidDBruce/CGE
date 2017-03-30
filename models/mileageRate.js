//P4-12 Kenneth Mott and Wendy Eloe
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var MileageRateSchema = new Schema({
  _id: { type: Number, required: true },
  startDate: {type: Date, default: Date.now, required: true},
  dollarsPerMile: { type: Number, required: true }
})

var mileageRate = mongoose.model('MilegeRate', MileageRateSchema)
module.exports = mileageRate

