const express = require('express');
const port = 3005;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path =require('path');
const app = express();
const route = require('./routers/index');
var session = require('express-session')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var cookieParser = require('cookie-parser')
// const sequelize = require('./helper/connect')
 //adminlte
 app.use(express.static('admin-lte'));
//thank kiu
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
// parser cookieeeeee
app.use(cookieParser())

//handle Image
app.use(express.static(path.join(__dirname, 'public')))
// app.use(morgan('combined'));
app.use('/extend', express.static(path.join(__dirname, 'extend')))
//xử lí dữ liệu html gửi lên 
app.use(express.urlencoded({
  extended: true
}));
//xử lí dữ liệu javascipt gửi lên
app.use(express.json());

// template engine 
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('views engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// route init
route(app);

app.listen(port, () => {
  console.log(`Running server...`)
});




