const {User} = require('../models');

const userController = {
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => {
            res.json(userData)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    // All next functions go beneath here



}

module.exports = userController;