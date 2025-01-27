
const express = require('express')

const router = express.Router();

const AppointmentController = require('../controllers/appointmentController')

// router.post('/login', patientController.loginPatient)
// router.post('/signup', userController.registerPatient)

router.get('/view_appointment',AppointmentController.getAppointment)
router.post('/create_appointment',AppointmentController.createAppointment)

router.put('/:id',AppointmentController.updateAppointment)
router.delete('/:id',AppointmentController.deleteAppointment)

module.exports = router;