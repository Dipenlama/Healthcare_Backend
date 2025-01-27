const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../database/db');
const { patch } = require('../routes/patientRoute');

const Patient = sequelize.define('Patient',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    } ,
    username: {
        type:DataTypes.STRING,
     },
    password: {
        type:DataTypes.STRING,

    }
})

module.exports = Patient;