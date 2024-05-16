const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
   id:{
    type: Number,
    required:true
   },
   desc:{
    type: String,
    required:true
   },
   category:{
    type: String,
    required:true
   },
   oldPrice:{
    type: Number,
    required:true
   },
   newPrice:{
    type: Number,
    required:true
   },
   date:{
    type:Date,
    default:Date.now()
   },
   available:{
    type:Boolean,
    default:true
   }
})
module.exports = mongoose.model('products', productSchema)