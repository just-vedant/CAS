// Student A1 authenticates to access the system.
// Professor P1 authenticates to access the system.
// Professor P1 specifies which time slots he is free for appointments.
// Student A1 views available time slots for Professor P1.
// Student A1 books an appointment with Professor P1 for time T1.
// Student A2 authenticates to access the system.
// Student A2 books an appointment with Professor P1 for time T2.
// Professor P1 cancels the appointment with Student A1.
// Student A1 checks their appointments and realizes they do not have any pending appointments.


const req = require('supertest');
const server = require('./app');
const pool = require('./models/db');
const jwt = require('jsonwebtoken');

describe('College Appointment System E2E testing',()=>{
    let studentA1,studentA2,professorP1;
    let T1 = '2024-12-10 10:00:00';
    let T2 = '2024-12-11 10:00:00';
    let appointmentA1; 
    let appointmentA2;

    beforeAll(async () => {
        await pool.query('DELETE FROM appointments')
        await pool.query('DELETE FROM availability')
    })

    it('Student A1 authenticates to access the system.',async()=>{
        const res = await req(server)
        .post('/auth/login')
        .send({email:'ved@gmail.com',password:'123456789'});

        expect(res.status).toBe(200);
        studentA1 = res.body.token;
    })

    it('Professor P1 authenticates to access the system.',async()=>{
        const res = await req(server)
        .post('/auth/login')
        .send({email:'vedant@gmail.com',password:'123456789'});

        expect(res.status).toBe(200);
        professorP1 = res.body.token;
    })

    it('Professor P1 specifies which time slots he is free for appointments.',async()=>{
        const res1 = await req(server)
        .post('/availability/add-availability')
        .set('Authorization',`Bearer ${professorP1}`)
        .send({timeSlots:T1});

        const res2 = await req(server)
        .post('/availability/add-availability')
        .set('Authorization',`Bearer ${professorP1}`)
        .send({timeSlots:T2});

        expect(res1.status).toBe(200);
        expect(res2.status).toBe(200);
    })

    it('Student A1 views available time slots for Professor P1.',async () => {
        const res = await req(server)
        .get('/availability/check-availability/6')
        

        expect(res.status).toBe(200);
    })

    it('Student A1 books an appointment with Professor P1 for time T1.',async()=>{
        const res = await req(server)
        .post('/appointment/book')
        .set('Authorization',`Bearer ${studentA1}`)
        .send({professorID:'6',timeSlots:T1});

        expect(res.status).toBe(200);
        appointmentA1 = res.body.slot.id;
        // console.log('Booked Slot ID:', appointmentA1);

    })

    it('Student A2 authenticates to access the system.',async()=>{
        const res = await req(server)
        .post('/auth/login')
        .send({email:'vedant2@gmail.com',password:'123456789'});

        expect(res.status).toBe(200);
        studentA2 = res.body.token;
    })

    it('Student A2 books an appointment with Professor P1 for time T2.',async()=>{
        const res = await req(server)
        .post('/appointment/book')
        .set('Authorization',`Bearer ${studentA2}`)
        .send({professorID:'6',timeSlots:T2});

        expect(res.status).toBe(200);
        appointmentA2 = res.body.slot.id;

    })

    it('Professor P1 cancels the appointment with Student A1.',async()=>{
        const res = await req(server)
        .delete('/appointment/cancel')
        .set('Authorization',`Bearer ${professorP1}`)
        .send({appointmentId:appointmentA1});

        expect(res.status).toBe(200);

    })

    it('Student A1 checks their appointments and realizes they do not have any pending appointments.',async () => {
        const res = await req(server)
        .get('/appointment/check-appointment')
        .set('Authorization',`Bearer ${studentA1}`)
        

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('There is  no appointment for you')
    })


})