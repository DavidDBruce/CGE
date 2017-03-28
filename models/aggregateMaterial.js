// P3-11 
// Sandeep Mulakala, David Schmitt
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var AggregateMaterialSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    aggregateType: { type: String, required: true, default: 'Sand', enum: ['Sand', 'Quartz', 'Flake', 'Glass Beads'] },
    defaultCoverageSqFt: { type: Number, required: true, default: 200 },
    unit: { type: String, required: true, default: '100lb bag' },
    displayorder: { type: String, required: true, default: 99 },
    price: { type: Number, required: true, default: 20 }
})

var aggregateMaterial = mongoose.model('AggregateMaterial', AggregateMaterialSchema)
module.exports = aggregateMaterial

