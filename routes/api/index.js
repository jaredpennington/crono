const router = require('express').Router();
const userRoute = require('./user-routes.js')

router.use('/users', userRoute);

module.exports = router;