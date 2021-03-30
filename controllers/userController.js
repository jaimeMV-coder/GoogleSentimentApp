const { json } = require('body-parser');
const User = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const {registerSchema,loginValidation} = require('../helpers/validation_schema');

module.exports = {
    index: async function(req,res,next){
        const users = await User.find({});
        res.status(200).json(users);
    },
    loginUser: async function(req,res,next){
    try {
        //Validar datos antes de hacer el usuario
        const {error} = await loginValidation.validateAsync(req.body); 
        //Verificar que existe el usuario
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(200).json({status:400,response:'Email not Found'});
        //Verificar password
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!validPassword) return res.status(200).json({status:400,response:'Wrong Password'});

        //Creacion y asignar el token
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        //console.log(req.body.email);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('auth-token',token);
        res.set('auth-token',token);
        res.status(200).json({status:"200",response:token});
        next();
    } catch (error) {
        const  message =error.details[0].message
            res.status(200).json({status:400,response:message});
        }
    },
    registerUser: async function(req,res,next){
    try {
        //Validar datos antes de hacer el usuario
        const {error} = await registerSchema.validateAsync(req.body);

        //Verificar que no existe el usuario
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(200).json({status:400,response:'Email already exist'});
        //Hash Passwords
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(req.body.password, salt);
        //Creacion de usuario req.body
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
        //Guardar usuario en base de datos
        const savedUser = await user.save();
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        res.status(200).json({status:"200",response:token});
    } catch (error) {
        const  message =error.details[0].message
        res.status(200).json({status:400,response:message});
    }
    },
    updateUser:async function(req,res,next){
        try {
            //Validar datos antes de hacer el usuario
            const {error} = await registerSchema.validateAsync(req.body);
    
            //Verificar que no existe el usuario
            const emailExist = await User.findOne({email: req.body.email});
            if(emailExist) return res.status(200).json({status:400,response:'Email already exist'});
            //Hash Passwords
            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(req.body.password, salt);
            //Creacion de usuario req.body
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
            //Guardar usuario en base de datos
            await User.findByIdAndUpdate(user, function (err) {
                if (err){
                    res.status(400).json({status:"400",response:err});
                }
                else{
                    res.status(200).json({status:"200",response:req.body.id});
                }
            });
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
            res.status(200).json({status:"200",response:token});
        } catch (error) {
            const  message =error.details[0].message
            res.status(200).json({status:400,response:message});
        }
        }
    
};

      