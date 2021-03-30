const mongoose = require('mongoose');
/*Base de datos MySql 
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'brguvhv0ojfdepjudovc-mysql.services.clever-cloud.com',
    user: 'uzx1r1xw4mgrktaj',
    password: 'FPGAGKsN5BweVSOI8Clf',
    port:'3306',
    database: 'brguvhv0ojfdepjudovc'
});
//Verificar la conexion
connection.connect(error => {
    if(error)throw error;
    console.log('Conexion Exitosa con la Base de Datos');
});*/
//Base de datos MongoDB
//console.log('Connected to MongoDB successfully');
//console.log('Failed to connect to MongoDB error: ');
const connectDB = async()=>{
    await mongoose.connect(process.env.DATABASE_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');
};
module.exports = connectDB;