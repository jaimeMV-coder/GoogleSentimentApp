const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(process.env.DATABASE_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');
};
module.exports = connectDB;
