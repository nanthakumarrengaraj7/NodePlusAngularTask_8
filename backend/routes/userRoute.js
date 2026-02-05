const express = require('express');
const { register, login } = require('../controllers/userController');
const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');
const route = express.Router();

route.post('/register', register);
route.post('/login', login);

route.get('/admin-data', verifyToken(['admin']), (req, res) => {
    res.json({ message: 'Welcome Admin' });
})

module.exports = route;