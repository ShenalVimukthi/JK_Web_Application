const express = require('express');
const router = express.Router();
const {
  getPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
  downloadAllPDF,
  downloadSinglePDF,
  downloadAllExcel,
  downloadSingleExcel
} = require('../controllers/personController');
const { protect } = require('../middleware/auth');

router.use(protect);

// SPECIFIC ROUTES FIRST
router.route('/pdf').get(downloadAllPDF);
router.route('/excel').get(downloadAllExcel);

// PARAMETERIZED ROUTES LAST
router.route('/')
  .get(getPeople)
  .post(createPerson);

router.route('/:id')
  .get(getPersonById)
  .put(updatePerson)
  .delete(deletePerson);

router.route('/:id/pdf').get(downloadSinglePDF);
router.route('/:id/excel').get(downloadSingleExcel);

module.exports = router;






// const express = require('express');
// const router = express.Router();
// const {
//   getPeople,
//   getPersonById,
//   createPerson,
//   updatePerson,
//   deletePerson,
//   downloadAllPDF,
//   downloadSinglePDF
// } = require('../controllers/personController');
// const { protect } = require('../middleware/auth');

// router.use(protect); // All routes require login

// router.route('/').get(getPeople).post(createPerson);
// router.route('/pdf').get(downloadAllPDF);
// router.route('/:id').get(getPersonById).put(updatePerson).delete(deletePerson);
// router.route('/:id/pdf').get(downloadSinglePDF);

// module.exports = router;