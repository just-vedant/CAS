const pool = require('./db');
const bcrypt = require('bcrypt');

//to check if User alredy exists in the database

const emailnotExist = async (email) =>{

    try {
        const check = await pool.query(`
            Select 1 FROM users
            WHERE email =$1`,
            [email]
            );
            
        return check.rowCount===0;
    } catch (err) {
        console.log('Error with checking email existence:',err.message);
    }
}
    
// Below code is for user SignIn

const comparePassword = async (inputPassword,hashedPassword) => {
    
    try {
        const res = await bcrypt.compare(inputPassword,hashedPassword);
        return res;
    } catch (err) {
        console.log('Error in comaparing the Password',err.message);
    }
}

module.exports = {emailnotExist,comparePassword};

