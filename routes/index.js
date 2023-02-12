const routers = require('express').Router()
const path = require('path')
// Import our modular routers for /tips and /feedback
const notes = require('./api');
const htmlRoute = require('./htmlRoutes')

routers.use('/',htmlRoute)

routers.use('/api', notes);
routers.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);



module.exports = routers;
