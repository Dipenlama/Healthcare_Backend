const Patient = require('../model/Patient')

const jwt= require ('jsonwebtoken')
const bcrypt=require('bcrypt')


 const registerPatient=async (req,res)=>{
    const{username, password}=req.body;
    if(!username || !password){
        return res.status(400).json({
            error:"Insert the username and password"
            
        });
    }
    try{
        const existingPatient=await Patient.findOne({where: {username}})
        if (existingPatient){
            return res.status(400).json({
                error:"Username already exists"
            })
        }
        const saltRounds=10
        const hashPassword=await bcrypt.hash(password,saltRounds)
        const newPatient= await Patient.create({username,password: hashPassword})
        res.status(201).json({message: "Registration successful......."})
    }
    catch(error){
        res.status(500).json({error:"Something went wrong"})
        console.log(error)
    }
    
 }
 const loginPatient=async(req,res)=>{
    const{username, password}=req.body;
    if(!username|| !password){
        return res.status(400).json({
            error:"Insert the username and password"
            
        });
    }try{
        const patient= await Patient.findOne({where:{username}})
        if(!patient){
            return res.status(400).json({
                error: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password,patient.password)
        if(!isMatch){
            return res.status(400).json({
                error:"Password didn't match"
            })
        }
        const token= jwt.sign(
        {id: patient.id,username:patient.username}, 'fgardsfgsdfadfsf3245srd',
        {expiresIn:'24h'})
        res.status(200).json({message: "Login Successful......."}, token)

    }

    catch(error){
        res.status(500).json({error:"something went wrong"})
        console.log(error)
    }
 }


// const getUser = async(req, res)=>{

//     try{
//         const tests = await User.findAll();
//         res.status(200).json(tests);

//     }
//     catch(error){
//         res.status(500).json({error: "Failed to Load"})
//     }
// }

// const createUser = async(req, res)=>{
    
//     try{
        
// const {username, password} = req.body;

// //Hash the password
// const newtest = await User.create({username, password})

// res.status(200).json(newtest);
//     }
//     catch(error){
//         res.status(500).json({error: "Failed to Load"})
//         console.log(error)
//     }

// }

// const updateUser = async(req, res)=>{
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.update(req.body);
//         res.json(user);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// }

// const deleteUser = async(req, res)=>{
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         await user.destroy();
//         res.json({ message: 'User deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }


// module.exports = {createUser, getUser, deleteUser, updateUser}


module.exports(loginPatient, registerPatient)

