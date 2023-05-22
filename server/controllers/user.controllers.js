const UserModel = require("../models/user.models")

module.exports = {
    //User Registration
    register: (req, res) => {
        UserModel.create(req.body)
            .then(user => {
                res.status(201).json({ msg: "success!", user: user });
            })
            .catch(err => res.status(400).json(err));
    }
}