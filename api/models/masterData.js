const mongoose  = require('mongoose')

const MasterDataSchema = new mongoose.Schema({
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
        enum: ['0%', '5%', '12%', '18%', '28%'],
        required: true
    },
    image:{
        type: String,
    }
})

module.exports = mongoose.model('MasterData', MasterDataSchema)
