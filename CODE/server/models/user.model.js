const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    mobileNumber : {
        type : Number,
        require : true
    },
    pincode : {
        type : String,
        require : true
    },
    isAdmin : {
        type : Boolean,
        require : true
    },
    role : {
        type : String,
        require : true
    }
})


const User = mongoose.model('User',UserSchema);

module.exports = User