const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Doctor = require("./Doctor");
const Patient = require("./User");

const Appointment = sequelize.define(
  "Appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "appointments",
    timestamps: true,
  }
);

// Define Associations
Doctor.hasMany(Appointment, { foreignKey: "doctor_id" });
Patient.hasMany(Appointment, { foreignKey: "patient_id" });
Appointment.belongsTo(Doctor, { foreignKey: "doctor_id" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id" });

module.exports = Appointment;
