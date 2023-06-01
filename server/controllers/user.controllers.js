const UserModel = require("../models/user.models")
const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken")
// will need this for login functionality
const bcrypt = require('bcrypt');

module.exports = {
    //User Registration
    register: async (req, res) => {
        try {
            const potentialUser = await UserModel.findOne({ email: req.body.email })
            if (potentialUser) {
                return res.status(400).json({
                    message: "Email already exist"
                });
            }
            const newUser = await UserModel.create(req.body)
            // UserModel.create(req.body)
            //     .then(user => {
            //         res.status(201).json({ msg: "success!", user: user });
            //     })
            //     .catch(err => res.status(400).json(err));
            const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: "2h" });
            res.cookie("usertoken", userToken, secret, { httpOnly: true }).json({
                message: "Success!",
                user: newUser
            });

        } catch (err) {
            return res.json(err);
        }
    },
    // login an existing user
    login: async (req, res) => {
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password); // if const unicorn it should be unicorn.password
                // it will be a boolean response
                if (passwordMatch) {
                    const userToken = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: "2h" });
                    res.cookie("usertoken", userToken, secret, { httpOnly: true }).json({
                        message: "Success!",
                        user: user
                    });
                }
                else {
                    res.status(400).json({
                        message: "invalid login attempt"
                    });
                }

            } else {
                res.status(400).json({
                    message: "Invalid login attempt"
                });
            }
        } catch (err) {
            return res.json(err);
        }
    }

}