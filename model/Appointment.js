const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../database/db');

const Appointment = sequelize.define('Appointment',{

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

module.exports = Appointment;