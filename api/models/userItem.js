const mongoose = require('mongoose')

const UserItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    masterDataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MasterData',
        required: true
    },
})

module.exports = mongoose.model('UserItem', UserItemSchema)