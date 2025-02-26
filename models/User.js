const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../database/db");

const User = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
     } ,
     full_name: {
         type:DataTypes.STRING,
      },
     contact: {
         type:DataTypes.STRING,
 
     },
     address: {
        type:DataTypes.STRING,

    },
     email: {
        type:DataTypes.STRING,

    },
    password: {
        type:DataTypes.STRING,

    },
    role: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "false",  // Default to patient if not specified
    },
});
(async ()=>{
    try{
        await User.sync();
    }
    catch(error){
    console.log(error)
    }
})();
module.exports = User;