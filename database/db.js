const { Sequelize } = require("sequelize");

require('dotenv').config


const sequelize = new Sequelize('Healthcare_system_db', 'postgres', 'admin123',{

    host: process.env.HOST,
    dialect: 'postgres',
    port: 5432,
    logging: false,
});


async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log('DB connection successful............................')
    }
    catch(error){
        console.error('Unable to connect to the database...............', error)

}    
}
testConnection()

module.exports = sequelize;