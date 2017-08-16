var express = require('express');
var app = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var routes = require('./lib/routes');
var nodemailer = require('nodemailer');
var functions = require('firebase-functions');

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

// create reusable transporter object using SMTP transport
// var transporter = nodemailer.createTransport({
// 	host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // secure:true for port 465, secure:false for port 587
//     auth: {
//         user: 'jasyfrig@gmail.com',
//         pass: 'April31027'
//     }
// });

// var mailOptions = {
//     from: 'sender address', // sender address
//     to: 'pelyllarrek-9800@yopmail.com', // list of receivers
//     subject: 'Password Reset', // Subject line
//     html: 'Your one time password is : <b>test </b>' // html body
// };

// transporter.sendMail(mailOptions, function(error, info) {
//     console.log(error, info);
// });

routes(app);

app.listen(app.get('port'), function() {
    console.log('LMB is running on port', app.get('port'));
});

exports.app = functions.https.onRequest(app);
