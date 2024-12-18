const express = require('express');
const UserRoutes = require('./routes/authRoute');
const Availability = require('./routes/professorAvailability');
const Appointment = require('./routes/appointment')
require('./models/db');



const app = express();

app.use(express.json());
app.use('/auth',UserRoutes);
app.use('/availability',Availability);
app.use('/appointment',Appointment);

const server = app.listen(2024,()=>{ 
    console.log('port is listening.')
})




module.exports = server;

// /auth/register