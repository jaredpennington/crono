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

    updateUser(req, res) {
        User.updateOne(req.body)
        //again idk what else i need to put here
    },

    deleteUser(req, res) {
        User.delete(req.body)
        //idk what else to put since im deleting the data created
    }
    // All next functions go beneath here



}

module.exports = userController;