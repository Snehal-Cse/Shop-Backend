const mongoose = require('mongoose')
 const db = mongoose.connect('mongodb+srv://snehalbandi5:EDDglRLLKJVu0QQb@shop.tlpojxq.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

  module.exports = db;