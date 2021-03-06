var express = require('express');
var app = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var routes = require('./lib/routes');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'landsummit'
});

// Set port to 5000
app.set('port', (process.env.PORT || 5000));

// Set static files
app.use(express.static(__dirname + '/public'));
app.use(expressSession({
    secret: 'lmb2017',
    saveUninitialized: true,
    resave: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json());

app.use('/node_modules', express.static(__dirname + '/node_modules'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbsutils.registerPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/partials');

routes(app, connection, nodemailer);

app.listen(app.get('port'), function() {
    console.log('LMB is running on port', app.get('port'));
});
