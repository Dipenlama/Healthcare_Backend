const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../database/db");

const Doctor = sequelize.define('doctors',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
     } ,
     full_name: {
         type:DataTypes.STRING,
      },
      
      image: {
          type:DataTypes.STRING,
       },
    speciality:{
         type:DataTypes.STRING,
 
     },
     status: {
        type:DataTypes.STRING,

    },
     about: {
        type:DataTypes.STRING,

    }
    
});
(async ()=>{
    try{
        await Doctor.sync();
    }
    catch(error){
    console.log(error)
    }
})();
module.exports = Doctor;