const { Pool } = require('pg');

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'appointment_system',
    password:'postgres',
    port:5432,
});


pool.connect((err,client,release) => {
    if(err){
        console.log('error connecting to the database ',err);
    }else{
        console.log('connected to the database');
    }
});

module.exports = pool;