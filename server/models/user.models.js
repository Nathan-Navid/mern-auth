const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

function emailValidation(email) {
    return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(email);
}

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
        validate: {
            validator: emailValidation,
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
// this should go after 
UserSchema.pre('save', async function (next) {
//     bcrypt.hash(this.password, 10)
//         .then(hash => {
//             this.password = hash;
//             next();
//         });
// });
try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
} catch (error) {
    next(error);
}
});
module.exports = mongoose.model("User", UserSchema)


