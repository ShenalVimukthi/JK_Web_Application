const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({

  name:  { type: String, required: true },
  addr:  { type: String },
  nic:   { type: String, required: true, unique: true },
  gsDiv: { type: String, required:true },
  phone: { type: String, required:true },
  
});

module.exports = mongoose.model('person', personSchema);