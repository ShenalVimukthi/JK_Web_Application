const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  idNumber: { type: String, required: true, unique: true, trim: true },
  gsDivision:{type: String,required: true,trim:true},
  email: { type: String, sparse: true, unique: true, lowercase: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for search
personSchema.index({ name: 'text', idNumber: 'text' });

module.exports = mongoose.model('Person', personSchema);