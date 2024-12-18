const pool = require('../models/db');

const bookSlot = async (req,res) => {

    const studentId = req.user.id;

    const {professorID,timeSlots} = req.body;

    try {
        const checkifBooked = await pool.query(
            `SELECT * FROM appointments 
            WHERE professor_id=$1 AND time_slot=$2`,
            [professorID,timeSlots]
        )
    
        if(checkifBooked.rowCount>0){
            return res.status(400).send('The slot is already booked')
        }
    
        const book = await pool.query(
            `INSERT INTO appointments (student_id,professor_id,time_slot,status)
            VALUES ($1,$2,$3,'booked')
            RETURNING *;`,
            [studentId,professorID,timeSlots]
        )
    
        if(book.rowCount>0){
            await pool.query(
                `DELETE FROM availability 
                WHERE professor_id=$1 AND time_slot=$2;`,
                [professorID,timeSlots]
            )
        }
    
        return res.status(200).json({message:'Slot booked successfully',slot:book.rows[0]});
    } catch (err) {
        console.log('Error in the student booking:',err.message)
    }

}

const studAppointment = async (req,res) => {

    studentId = req.user.id;

    try {
        const Appointments = await pool.query(
            `SELECT professor_id,time_slot,status
            FROM appointments
            WHERE student_id=$1 AND status='booked'
            ORDER BY time_slot ASC`,
            [studentId]
        )
    
        if(Appointments.rowCount===0){
            res.status(400).json({message:'There is  no appointment for you'})
        }
    
        res.status(200).json({message:'Got Appointments successfully',appointments:Appointments.rows[0]})
    } catch (err) {
        console.log('Error in checking the Appointments for the student',err.message);
    }
}

const profAppointment = async (req,res) => {

    professorId = req.user.id;

    try {
        const Appointments = await pool.query(
            `SELECT student_id,time_slot,status
            FROM appointments
            WHERE professor_id=$1
            ORDER BY time_slot ASC`,
            [professorId]
        )
    
        if(Appointments.rowCount===0){
            res.status(400).send('There is  no appointment made')
        }
    
        res.status(200).json({message:'Got Appointments successfully',appointments:Appointments.rows[0]})
    } catch (err) {
        console.log('Error in checking the Appointments for the professor',err.message);
    }
}

const cancelAppointment = async (req,res) => {
    professorID = req.user.id;

    const {appointmentId} = req.body;

    try {
        const Appointments = await pool.query(
            `SELECT student_id,time_slot,status
            FROM appointments
            WHERE professor_id=$1 AND id=$2
            ORDER BY time_slot ASC`,
            [professorID,appointmentId]
        )
    
        if(Appointments.rowCount===0){
            res.status(400).send('There is  no appointment made')
        }
    
        const { time_slot } = Appointments.rows[0];
    
        await pool.query(
            `UPDATE appointments
            SET status = 'cancelled'
            WHERE id=$1 AND professor_id=$2`,
            [appointmentId,professorID]
        ) 
    
        await pool.query(
            `INSERT INTO availability (professor_id,time_slot)
            VALUES ($1,$2)`,
            [professorID,time_slot]
        )

        res.status(200).json({message:'Appointment cancelled successfully'})
    
    } catch (err) {
        console.log('Error in cancelling the Appointment by the professor ',err.message)
    }


}


module.exports = {bookSlot,studAppointment,profAppointment,cancelAppointment}