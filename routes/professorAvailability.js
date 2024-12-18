const express = require('express');
const { profToken } = require('../middleware/jwt');
const { addAvailability, updateAvailibilty, checkAvailability } = require('../controllers/availability');
const router= express.Router();

router.post('/add-availability',profToken,addAvailability);//Professor Specifies availability
router.get('/update-availability/:slotId',profToken,updateAvailibilty);
router.get('/check-availability/:professorId',checkAvailability);//Student Reads the professor available slots.


module.exports = router; 