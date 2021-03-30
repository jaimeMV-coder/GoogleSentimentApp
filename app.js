const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./database')
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const path = require('path');
dotenv.config();
//Importado de routas
const authRoute = require('./routes/auth');
const googleText = require('./routes/googleText');
const textRoutes = require('./routes/textRoutes');
const { truncate } = require('fs');
//Setting App
const PORT = process.env.PORT || 3050;
const app  = express();
app.set('views',path.join(__dirname,'views'));
connectDB();

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Route Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
app.use(bodyParserURLEncoded);
app.use('/api/user',authRoute);
app.use('/api/googleText',googleText); 
app.use('/api/text',textRoutes); 
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

