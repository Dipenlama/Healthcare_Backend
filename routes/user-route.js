const express = require('express');
const { login, register, getDoctorsData, getUserProfile, bookAppointment, upComingAppointments } = require('../controllers/user-controller');
const authUser = require('../middlewares/authUser');
const { getBlogs, getBlogById, updateBlogById, deleteBlogById } = require('../controllers/blog-controller');

const router = express.Router()

//Register
router.post("/register", register)

//Login
router.post("/login", login)

//Get User Data
router.get("/get-profile", authUser, getUserProfile)


//Get Doctors Data
router.get("/getData", getDoctorsData)

//Book new Appointment
router.post("/book-new-appointment", authUser, bookAppointment)
    
//Get Upcoming appointments for user
router.get("/user-appointments", authUser, upComingAppointments)

//Get Blogs Data
router.get("/Blogs", getBlogs)

//Get Blog by ID
router.get("/Blogs/:id", getBlogById)

//Update Blog by ID
router.put("/update/Blogs/:id", updateBlogById)

//Delete Blog by ID
router.delete("/delete/Blogs/:id", deleteBlogById)

module.exports = router