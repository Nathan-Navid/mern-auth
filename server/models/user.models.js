const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const {isEmail} = require ('validator')

// 2 ways for check the email
// function emailValidation(email) {
//     return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(email);
// }
// then added to email validate: {validator: emailValidation,
            // message: "Please enter a valid email"}
// or npm install validator and validator : [isEmail, "please enter valid password"]

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });

// Middleware to check to create virtual field confirm password.
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

// Middleware to validate the password and confirm password match
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
// this should go after and 2 ways

UserSchema.pre('save', function (next) {
    // 10 is number of salt number random additional will add to the password
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
// UserSchema.pre('save', async function (next) {
// try {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
//     next();
// } catch (error) {
//     next(error);
// }
// });
module.exports = mongoose.model("User", UserSchema)


