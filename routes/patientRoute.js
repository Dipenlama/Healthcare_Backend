
const express = require('express')

const router = express.Router();

const patientController = require('../controllers/PatientController')

router.post('/login', patientController.loginPatient)
router.post('/signup', userController.registerPatient)

// router.get('/view_users',userController.getUser)
// router.post('/create_users',userController.createUser)

// router.put('/:id',userController.updateUser)
// router.delete('/:id',userController.deleteUser)

module.exports = router;