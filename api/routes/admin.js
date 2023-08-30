const express = require('express');
const router = express.Router();
const authService = require('../service/auth');
const requestService = require('../service/requests');


router.get('/', (req, res) => {
    res.send('Admin route')
})
router.post('/register', authService.registerAdmin);
router.post('/login', authService.login);
router.get('/requests', requestService.getRequests);
router.post('/approve', requestService.approveRequest);
router.post('/reject', requestService.rejectRequest);
router.get('/masterdata', requestService.getMasterData);
router.get('/requests/:id', requestService.getRequestsByUser);

module.exports = router;