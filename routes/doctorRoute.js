const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route to create a new doctor
router.post('/', doctorController.createDoctor);

// Route to update doctor details
router.put('/:id', doctorController.updateDoctor);

// Route to delete a doctor
router.delete('/:id', doctorController.deleteDoctor);

router.get('/:id', doctorController.getDoctorById);

router.get('/',doctorController.getAllDoctors);

module.exports = router;
