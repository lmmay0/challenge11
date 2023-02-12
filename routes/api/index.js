const routers = require('express').Router()
// Import our modular routers for /tips and /feedback
const notes = require('./nodes');


routers.use('/notes',notes)






module.exports = routers;
