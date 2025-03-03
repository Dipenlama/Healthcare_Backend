const jwt = require("jsonwebtoken")
const doctorModel = require("../models/doctor-model")
const { uploadOnCloudinary } = require("../utils/cloudinary")
const userModel = require("../models/user-model")
const appointmentModel = require("../models/appointment-model")




//Admin login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const payload = { email, password };
      const admin_token = jwt.sign(payload, process.env.JWT_SECRET);
      res.cookie("admin_token", admin_token, { httpOnly: true }); 
      res
        .status(201)
        .send({
          success: true,
          message: "Admin logged in successfully!",
          admin_token,
        });
    } else {
      res.status(401).send({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

 //Admin add doctor controller
 const addDoctor = async (req, res) => {
    try {
        const { name, email, password, phone, specialization, experience, fee }  = req.body
        const imageFile = req.file
        if(!imageFile){
            return res.status(201).send({success: false, message: "Please upload a file"})
        }
        console.log({name, email, password, phone, specialization, experience, fee}, imageFile)
        const exists  = await doctorModel.findOne({email:email, password:password})
        if(exists) {
            return res.status(201).send({success: false, message: "Doctor already exists"})
        }
        const imageLocalPath = req.file?.path;
        if(!imageLocalPath){
            return res.status(201).send({success: false, message:"Picture file is required"})
        }
        const picture = await uploadOnCloudinary(imageLocalPath)
        if(!picture) {
            return res.status(201).send({success: false, message: "Try Again, Cloudinary issue"})
        }
        
            //Otherwise 
            const doctor =  await doctorModel.create({
                name,
                email, 
                password, 
                phone, 
                specialization,
                experience,
                fee,
                picture: picture.secure_url 

            })
            await doctor.save()
            return res.status(200).send({success: true, message: "Doctor added successfully!" })
       
    } catch (error) {
        console.log("admin controller addDoctor Error: ", error.message);
        
    }
 }

 //Admin delete a doctor 
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.query; 

    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "Doctor ID is required" });
    }

    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res
        .status(404)
        .send({ success: false, message: "Doctor Not found" });
    }

    await doctor.deleteOne(); 

    return res
      .status(200)
      .send({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
};


//Get Stats 

const getStats = async (req, res) => {
    try {
        const doctorsData = await doctorModel.find({})
        const usersData = await userModel.find({})
        const appointmentData = await appointmentModel.find({})
        const reverseData = appointmentData.reverse()
    res.status(201).send({success: true, message: "All data loaded successfuly", doctorsData, usersData, reverseData})
    } catch (error) {
        console.log(error);
        
    }
    
}

//Api to update the appointments
const updateAppointments = async (req, res) => {
    const  data  = req.body
    if(!data){
        return res.status(201).send({success: true, message: "No Appointment found"});
    }   
    const appointmentstatus = await appointmentModel.findById({_id: data.appointmentId});
    console.log(appointmentstatus.Status);
    if(appointmentstatus.Status !== "confirmed"){
        const appointment = await appointmentModel.findByIdAndUpdate({_id: data.appointmentId}, {Status: "confirmed"})
        appointment.save()
    }else{
        const appointment = await appointmentModel.findByIdAndUpdate({_id: data.appointmentId}, {Status: "cancelled"})
        appointment.save()
    }

    return res.status(200).send({success: true, message: "Appointments updated"})
}



module.exports = {
    login,
    addDoctor,
    deleteDoctor,
    getStats,
    updateAppointments
}