const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['admin','user'],
        default:'user',
        required:true
    }
})

module.exports = mongoose.model('User', UserSchema)