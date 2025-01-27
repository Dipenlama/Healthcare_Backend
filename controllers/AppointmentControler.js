const Appointment = require('../model/Appointment');
const Appointment = require('../model/Appointment');
const Appointment = require('../model/Appointment')



const getAppointment = async(req, res)=>{

    try{
        const tests = await Appointment.findAll();
        res.status(200).json(tests);

    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
    }
}

const createAppointment = async(req, res)=>{
    
    try{
        
const {username, password} = req.body;

//Hash the password
const newAppointment = await Appointment.create({username, password})

res.status(200).json(newtest);
    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
        console.log(error)
    }

}

const updateAppointment = async(req, res)=>{
    try {
        const Appointment = await Appointment.findByPk(req.params.id);
        if (!Appointment) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Appointment.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteAppointment = async(req, res)=>{
    try {
        const Appointment = await Appointment.findByPk(req.params.id);
        if (!Appointment) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Appointment.destroy();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {createAppointment, getAppointment, deleteAppointment, updateAppointment}




