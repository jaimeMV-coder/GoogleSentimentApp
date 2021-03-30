
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    userID:{
        type: String,
        required:true,
        min:24,
        max:255
    },
    text:{
        type: String,
        required:true
    },
    score:{
        type: Number  ,
        required:true
    },
    magnitude:{
        type: Number  ,
        required:true
    }   
},{
    timestamps : true
});

module.exports = mongoose.model('Text',textSchema);