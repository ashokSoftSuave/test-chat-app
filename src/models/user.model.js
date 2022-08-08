const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: String,
    name: String,
    phoneNumber: Number,
    email: String,
    profileImg: String,
    password:String,
})

module.exports = mongoose.model('users',userSchema)