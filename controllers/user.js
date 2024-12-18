const { generate } = require('../middleware/jwt');
const pool = require('../models/db');
const { emailnotExist, comparePassword} = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();


const register = async (req,res) => {
    try {
        const {name,email,password,role} = req.body;

        const hashedPassword = await bcrypt.hash(password,8)

        if(!(await emailnotExist(email))){
            return res.send('Email Already in use Please try Signing-In.');
        }
        
        //Insert user into the table 
        const insert = await pool.query(`
            INSERT INTO users(name,email,password,role)
            VALUES ($1,$2,$3,$4)
            RETURNING *;`,
        [name,email,hashedPassword,role]
        );

        res.send(insert);
    } catch (err) {
        console.log('Error in Registering user',err.message);
        throw err;
    }
}

const login =  async (req,res) =>{
    const {email, password, role} = req.body;

    try {
        if(await emailnotExist(email)){
            return res.status(401).json({error:'Invalid email or password'});
        }
    
    
    
        const userData = await pool.query(`
            SELECT id,password,role FROM users
            WHERE email = $1`
            ,[email]
        );
    
        const User = userData.rows[0];
    
        const pass = await comparePassword(password,User.password);
    
    
        if(!pass){
            return res.status(401).json({error:'Invalid email or password'});
        }
    
        const token = generate({id:User.id,role:User.role})
    
        res.status(200).header('Authorization',`JWTBEARER ${token}`)
        .json({message:'Login successful!', token});
    } catch (err) {
        console.log('Error in login inside the controller ',err.message);
    }

}

module.exports = { register,login }