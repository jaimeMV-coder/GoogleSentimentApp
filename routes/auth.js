const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const {index,loginUser,registerUser} = require('../controllers/userController');
//Validaciones
const {registerSchema,loginValidation} = require('../helpers/validation_schema');
const verify = require('./verifyToken');

router.post('/login',loginUser);
router.get('/login');
router.post('/register',registerUser,(req,res)=>{
});

module.exports = router;