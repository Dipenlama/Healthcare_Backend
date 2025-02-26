const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT signing (use the same key stored in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register a new patient (Create patient with hashed password)
const registerPatient = async(req, res)=>{
    try {
        const { full_name, contact, address, email, password ,role} = req.body;

        // Check if the patient already exists
        const existingPatient = await User.findOne({ where: { email } });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new patient record
        const patient = await User.create({
            full_name,
            contact,
            address,
            email,
            password: hashedPassword,
            role,
        });

        // Respond with the new patient (excluding the password)
        res.status(201).json({
            message: 'Registered successfully',
            patient: {
                id: patient.id,
                full_name: patient.full_name,
                email: patient.email,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login patient (Validate credentials and generate a JWT token)
const loginPatient = async (req, res)=> {
    try {
        const { email, password } = req.body;

        // Find patient by email
        const patient = await User.findOne({ where: { email } });
        if (!patient) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token (expires in 1 hour)
        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with token and user info (excluding password)
        res.status(200).json({
            message: 'Login successful',
            token,
            patient: {
                id: patient.id,
                full_name: patient.full_name,
                email: patient.email,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

// Protected route: Fetch patient profile (only accessible with valid JWT)
 const getProfile = async(req, res)=>{
    const patientId = req.user.id; // Get patient ID from JWT token
    try {
        const patient = await User.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            message: 'Profile fetched successfully',
            patient: {
                id: patient.id,
                full_name: patient.full_name,
                email: patient.email,
                contact: patient.contact,
                address: patient.address,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerPatient, loginPatient, getProfile };
