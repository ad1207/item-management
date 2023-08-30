const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy', 'meat', 'grain', 'other'],
        required: true
    },
    mrp: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
})

module.exports = mongoose.model('Request', RequestSchema)


