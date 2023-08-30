const User = require('../models/user')

module.exports.registerAdmin = async (req, res) => {
    try{
        const {name, email, password} = req.body
        let existing = await User.findOne({email})
        if(existing){
            return res.status(400).json({message: "Admin already exists"})
        }
        const user = new User({
            name,
            email,
            password,
            type: 'admin'
        })
        await user.save()
        res.status(200).json({message: "Admin created successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body
        let existing = await User.findOne({email})
        if(existing){
            return res.status(400).json({message: "User already exists"})
        }
        const user = new User({
            name,
            email,
            password,
            type: 'user'
        })
        await user.save()
        res.status(200).json({message: "User created successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.login = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User does not exist"})
        }
        if(user.password !== password){
            return res.status(400).json({message: "Invalid credentials"})
        }
        user.password = undefined;
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

