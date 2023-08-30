const express = require('express');
const router = express.Router();
const authService = require('../service/auth');
const requestService = require('../service/requests');
const itemService = require('../service/items');
router.get('/', (req, res) => {
    res.send('User route')
})
router.post('/register', authService.registerUser);
router.post('/login', authService.login);
router.get('/requests/:id', requestService.getMyRequests);
router.post('/request', requestService.addRequest);
router.get('/masterdata', requestService.getMasterData);
router.get('/items/:userId', itemService.getItems);
router.post('/items/add', itemService.addItem);
router.post('/items/delete', itemService.deleteItem);
router.get('/masterdata/:userId', requestService.getMasterDataByUser);
module.exports = router;