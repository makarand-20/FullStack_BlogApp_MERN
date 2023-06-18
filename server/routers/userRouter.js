const express = require('express');
const router = express.Router();

const {userRegister, userLogin, userCurrent, verifyToken, getAllUsers, getUserById} = require('../controllers/userController');

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/current', verifyToken, userCurrent);
router.get('/all', getAllUsers);
router.get('/:id', getUserById);


module.exports = router;