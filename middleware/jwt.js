const jwt = require('jsonwebtoken')
require('dotenv').config();

const generate = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRATION});
}



const authToken = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        res.send('Token is missing')
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Error in jwt auth Token',err.message);
    }
}

const profToken = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        res.send('Token is missing')
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role !== 'professor'){
            return res.status(403).json({error: 'Access denied. Professors only'});
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Error in jwt auth Token',err.message);
    }
}

const studToken = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        res.send('Token is missing')
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role !== 'student'){
            return res.status(403).json({error: 'Access denied. Studentss only'});
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.log('Error in jwt auth Token',err.message);
    }
}

module.exports = {generate,authToken,profToken,studToken};