const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./database/db')
const userRoute = require('./routes/userRoute')
const doctorRoute = require('./routes/doctorRoute')

require('dotenv').config();
//Creating a Server
const app = express();

//Creating a port
const PORT = process.env.PORT

//Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const currentDate = new Date();

app.get('/',(req, res)=>{
res.send(currentDate + '' + '' + " Backend of Healthcare")
})

// Use authentication routes
app.use('/auth', userRoute);
app.use('/doctor', doctorRoute);


//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})
