const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true,trim:true,minlength:3,required:true},
    email:{type:String,unique:true,trim:true,minlength:3,required:true},
    password:{type:String,trim:true,minlength:3,required:true},
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
})

const User = mongoose.model('User',userSchema);

module.exports = User;