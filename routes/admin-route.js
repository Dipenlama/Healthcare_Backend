const express = require("express")
const {login, addDoctor, getStats, updateAppointments, deleteDoctor} = require("../controllers/admin-controller")
const  upload = require("../middlewares/multerMiddleware.js")
const authAdmin = require("../middlewares/authAdmin.js")
const { createBlog } = require("../controllers/blog-controller.js")



const router = express.Router()

//Admin Login
router.post("/login", login)

//Admin Add Doctor
router.post("/add-doctor",  authAdmin, upload.single("file"),  addDoctor)

//Admin delete Doctor
router.delete("/delete-doctor",  deleteDoctor)

//Get All Data Stats
router.get("/getStats",  authAdmin,  getStats)

//Api to Update the appointments
router.post("/update-appointment", authAdmin,  updateAppointments)

//Create a new blog
router.post("/blog-new", authAdmin,  createBlog)



module.exports = router