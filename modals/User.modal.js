const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true }
}, { timestamps: true });

const User = mongoose.model('UserData', userSchema);

module.exports = User;
