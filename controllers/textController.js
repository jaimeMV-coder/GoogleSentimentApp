const { json } = require('body-parser');
const Text = require('../models/texts');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginValidation, textSchema } = require('../helpers/validation_schema');


module.exports = {
    consultTextByUser: async function (req, res, next) {
        const listText = await Text.find({ userID: req.get('auth-token') });
        //console.log(listText);
        res.status(200).json(listText);
    },
    addNewText: async function (req, res, next) {
        //Esta funcion la utilizo desde el controlador de googleText
        const miText = new Text({
            userID: req.get('auth-token'),
            text: req.body.text,
            score: sentiment.score,
            magnitude: sentiment.magnitude
        });
        console.log(miText);
        //const {error} = await textSchema.validateAsync(miText);
        const savedText = await miText.save();
    },
    deleteTextById: async function (req, res, next) {
        console.log(req.body.id);
        await Text.findOneAndDelete({ _id: req.body.id }, function (err) {
            if (err){
                res.status(400).json({status:"400",response:err});
            }
            else{
                res.status(200).json({status:"200",response:req.body.id});
            }
        });
    },
    editTextById: async function (req, res, next) {
        const miText = new Text({
            userID: req.get('auth-token'),
            text: req.body.text,
            score: sentiment.score,
            magnitude: sentiment.magnitude
        });
        await Text.findByIdAndUpdate(miText, function (err) {
            if (err){
                res.status(400).json({status:"400",response:err});
            }
            else{
                res.status(200).json({status:"200",response:req.body.id});
            }
        });
    },
    consultTextSortDescendentScore: async function (req, res, next) {
        const listText = await Text.find({ userID: req.get('auth-token')} ).sort( { score: -1 });
        res.status(200).json(listText);
    },
    consultTextSortAscendentScore: async function (req, res, next) {
        const listText = await Text.find({ userID: req.get('auth-token')} ).sort( { score: 1 });
        res.status(200).json(listText);
    },
    consultTextSortAscendentDate: async function (req, res, next) {
        const listText = await Text.find({ userID: req.get('auth-token')} ).sort( { createdAt: 1 });
        res.status(200).json(listText);
    },
    consultTextSortDescendentDate: async function (req, res, next) {
        const listText = await Text.find({ userID: req.get('auth-token')} ).sort( { createdAt: -1 });
        res.status(200).json(listText);
    }

};