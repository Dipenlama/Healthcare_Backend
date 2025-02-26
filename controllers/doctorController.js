const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/doctor');

// Secret key for JWT signing (use the same key stored in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register a new patient (Create patient with hashed password)
const createDoctor = async(req, res)=>{
    try {
        const { full_name, speciality, status, about,} = req.body;


        // Create new patient record
        const doctor = await Doctor.create({
            full_name,
            speciality,
            status,
            about,
        });

        // Respond with the new patient (excluding the password)
        res.status(201).json({
            message: 'Registered successfully',
                doctor: {
                id: doctor.id,
                full_name: doctor.full_name,
                
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params; // Get doctor ID from request parameters
        const { full_name, speciality, status, about } = req.body;

        // Find doctor by ID
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Update doctor details
        await doctor.update({ full_name, speciality, status, about });

        res.status(200).json({
            message: 'Doctor updated successfully',
            doctor: {
                id: doctor.id,
                full_name: doctor.full_name,
                speciality: doctor.speciality,
                status: doctor.status,
                about: doctor.about,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params; // Get doctor ID from request parameters

        // Find doctor by ID
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Delete doctor
        await doctor.destroy();

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params; // Get doctor ID from request parameters

        // Find doctor by ID
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({
            message: 'Doctor found successfully',
            doctor: {
                id: doctor.id,
                full_name: doctor.full_name,
                speciality: doctor.speciality,
                status: doctor.status,
                about: doctor.about,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll(); // Fetch all doctors from the database
        res.status(200).json({ doctors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { createDoctor, updateDoctor, deleteDoctor, getDoctorById,getAllDoctors };
