const pool = require('../models/db');

const addAvailability = async (req,res) => {
    
    const professorId = req.user.id;

    const { timeSlots } = req.body;

    try {
        if(!timeSlots){
            return res.status(400).send('Time slot not provided');
        }
    
        const alreadyExists = await pool.query(
            `SELECT * FROM availability
            WHERE professor_id=$1 AND time_slot=$2`,
            [professorId, timeSlots]
        );
    
        if(alreadyExists.rowCount > 0){
            return res.status(400).send('Time slot already exists.')
        }
    
        const addSlots = await pool.query(
            `INSERT INTO availability (professor_id,time_slot)
            VALUES ($1,$2)
            RETURNING *;`,
            [professorId,timeSlots] 
        ) 
        return res.status(200).json({
            message:'Time slot added successfully',
            slot: addSlots.rows[0]
        });
    
    } catch (err) {
        console.log('Error in adding a new slot in the availability table',err.message);
    }
}

const updateAvailibilty = async (req,res) => {
    
    const professorId = req.user.id;

    const { slotId } = req.params;
    const newTimeSlot = req.body.newTimeSlot;

    try {
        if(!newTimeSlot){
            console.log('The new Time Slot is not given')
        }
    
        const updateSlot = await pool.query(
            `UPDATE availability
            SET time_slot=$1
            WHERE professor_id=$2 AND id=$3
            RETURNING *;`,
            [newTimeSlot,professorId,slotId]
        )
    
        return res.json({message:'UPDATED the time slot ',Slot:updateSlot.rows[0]});
    } catch (err) {
        console.log('Error in updating the time slots',err.message);
    }

}

const checkAvailability = async (req,res) => {
    const professorId = req.params.professorId;

    try {
        const getAvailability = await pool.query(
            `SELECT professor_id,time_slot FROM availability
            WHERE professor_id=$1;`,
            [professorId]
        );
        if(getAvailability.rowCount===0){
            res.send('The Professor isnt available at the moment wait until he adds more slots.')
        }
    
        res.status(200).send(getAvailability.rows);
    } catch (err) {
        console.log('Error in checking the prpofessor availability',err.message)
    }
}

module.exports = {addAvailability,updateAvailibilty,checkAvailability};