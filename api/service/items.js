const UserItem = require('../models/userItem')

module.exports.addItem = async (req, res) => {
    try{
        const {userId, masterDataId} = req.body
        const existing = await UserItem.findOne({userId, masterDataId})
        if(existing){
            return res.status(400).json({message: "Item already exists"})
        }
        const userItem = new UserItem({
            userId,
            masterDataId
        })
        await userItem.save()
        res.status(200).json({message: "Item added successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.deleteItem = async (req, res) => {
    try{
        const {userId, masterDataId} = req.body
        await UserItem.deleteOne({userId, masterDataId})
        res.status(200).json({message: "Item deleted successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.getItems = async (req, res) => {
    try{
        const {userId} = req.params
        const items = await UserItem.find({userId}).populate('masterDataId')
        res.status(200).json(items)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}