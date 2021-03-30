const router = require('express').Router();
const verify = require('./verifyToken');
const{
    googleText
} = require ('../controllers/googleTextController');

router.post('/consultText',verify,googleText,(req,res)=>{
    //console.log(req.user);
});
module.exports = router;