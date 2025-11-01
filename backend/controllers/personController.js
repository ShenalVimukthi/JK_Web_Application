const asyncHandler = require('express-async-handler');
const Person = require('../models/person');
const { generatePDF } = require('../utils/generatePDF');

// @desc    Get all people
const getPeople = asyncHandler(async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

// @desc    Get single person
const getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (person) res.json(person);
  else res.status(404).json({ message: 'Person not found' });
});


// @desc    Create person
const createPerson = asyncHandler(async (req, res) => {
  const { name, addr, nic, gsDiv, phone, family, residenceTyp } = req.body;
  const person = await Person.create({ name, addr, nic, gsDiv, phone, family, residenceTyp });
  res.status(201).json(person);
});


// @desc    Update person
const updatePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (person) {
    Object.assign(person, req.body);
    await person.save();
    res.json(person);
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

// @desc    Delete person
const deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (person) {
    await person.deleteOne();
    res.json({ message: 'Person removed' });
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
});

// @desc    Download all as PDF
const downloadAllPDF = asyncHandler(async (req, res) => {
  const people = await Person.find();
  generatePDF(people, res);
});

// @desc    Download single as PDF
const downloadSinglePDF = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) return res.status(404).json({ message: 'Not found' });
  generatePDF(person, res, true);
});

module.exports = {
  getPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
  downloadAllPDF,
  downloadSinglePDF
};