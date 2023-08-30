const Request = require('../models/request')
const User = require('../models/user')
const MasterData = require('../models/masterData')
const {ObjectId} = require('mongoose').Types
const UserItem = require('../models/userItem')

module.exports.getRequests = async (req, res) => {
    try{
        //const requests = await Request.find({status: {$in: ['pending', 'approved']}}).group().populate('requestedBy', 'name')
        const requests = await Request.aggregate([
            {
                $match: {
                    status: { $in: ['pending', 'approved'] } // Exclude 'rejected' status
                }
            },
            {
                $lookup: {
                    from: 'users', // Collection name for the User model
                    localField: 'requestedBy',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $group: {
                    _id: '$requestedBy',
                    user: { $first: '$user.name' },
                    pendingRequests: {
                        $push: {
                            $cond: [{ $eq: ['$status', 'pending'] }, '$$ROOT', null]
                        }
                    },
                    approvedRequests: {
                        $push: {
                            $cond: [{ $eq: ['$status', 'approved'] }, '$$ROOT', null]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    pendingRequests: {
                        $filter: { input: '$pendingRequests', cond: '$$this' }
                    },
                    approvedRequests: {
                        $filter: { input: '$approvedRequests', cond: '$$this' }
                    }
                }
            }
        ]);
        res.status(200).json(requests);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.addRequest = async (req, res) => {
    try{
        const {name, category, mrp, gst, image, requestedBy} = req.body
        const request = new Request({
            requestedBy: requestedBy,
            name,
            category,
            mrp,
            gst,
            image
        })
        await request.save()
        res.status(200).json({message: "Request added successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.approveRequest = async (req, res) => {
    try{
        const {id} = req.body;
        const request = await Request.findById(id)
        if(!request){
            return res.status(400).json({message: "Request does not exist"})
        }
        request.status = 'approved'
        await request.save()
        const masterData = new MasterData({
            name: request.name,
            category: request.category,
            mrp: request.mrp,
            gst: request.gst,
            image: request.image
        })
        let data = await masterData.save()
        const userItem = new UserItem({
            userId: request.requestedBy,
            masterDataId: data._id
        })
        await userItem.save()
        res.status(200).json({message: "Request approved successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
} 

module.exports.rejectRequest = async (req, res) => {
    try{
        const {id} = req.body;
        const request = await Request.findById(id)
        if(!request){
            return res.status(400).json({message: "Request does not exist"})
        }
        request.status = 'rejected'
        await request.save()
        res.status(200).json({message: "Request rejected successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.getRequestsByUser = async (req, res) => {
    try{
        const {id} = req.params;
        const userId = new ObjectId(id)
        const requests = await Request.aggregate([
            {
                $match: {
                    requestedBy: userId,
                    status: { $in: ['pending', 'approved'] } // Exclude 'rejected' status
                }
            },
            {
                $lookup: {
                    from: 'users', // Collection name for the User model
                    localField: 'requestedBy',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $group: {
                    _id: '$requestedBy',
                    user: { $first: '$user.name' },
                    pendingRequests: {
                        $push: {
                            $cond: [{ $eq: ['$status', 'pending'] }, '$$ROOT', null]
                        }
                    },
                    approvedRequests: {
                        $push: {
                            $cond: [{ $eq: ['$status', 'approved'] }, '$$ROOT', null]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    pendingRequests: {
                        $filter: { input: '$pendingRequests', cond: '$$this' }
                        
                    },
                    approvedRequests: {
                        $filter: { input: '$approvedRequests', cond: '$$this' }
                    }
                }
            }
        ]);
        res.status(200).json(requests);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.getMyRequests = async (req, res) => {
    try{
        const {id} = req.params;
        const requests = await Request.find({requestedBy: id})
        res.status(200).json(requests);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.getMasterData = async (req, res) => {
    try{
        const masterData = await MasterData.find()
        res.status(200).json(masterData);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports.getMasterDataByUser = async (req, res) => {
    try{
        const masterData = await MasterData.find()
        const {userId} = req.params
        const userItems = await UserItem.find({userId})
        const items = userItems.map(item => item.masterDataId.toString())
        const data = masterData.map(item => {       
            if(items.includes(item._id.toString())){
                return {...item._doc, added: true}
            }
            else{
                return {...item._doc, added: false}
            }
        })
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}