const express = require('express');
const { studToken, profToken } = require('../middleware/jwt');
const { bookSlot, studAppointment, profAppointment, cancelAppointment } = require('../controllers/appointments');
const router = express.Router();

//Students book an appointment
router.post('/book',studToken,bookSlot);

router.get('/check-appointment',studToken,studAppointment);//students fetch their appointments

router.get('/professor-appointments',profToken,profAppointment);//professors fetch their appointment 

router.delete('/cancel',profToken,cancelAppointment);//professors cancel their appointments

module.exports = router;