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

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'jasyfrigi@gmail.com',
            pass: 'Vansoffthewall'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: 'jasyfrigi@gmail.com', // sender address
        to: 'jasyfrigi@gmail.com', // list of receivers
        subject: 'Registration', // Subject line
        text: 'Greetings!' +
          'Thank you for your registration to the National Land Summit 2018! You will be notified ' +
          'once your office confirmed your participation in this event.' +
          'Very truly yours,<br/><br/>' +
          'Web Team<br/>National Land Summit 2018', // plain text body
        html: 'Greetings! <br/><br/>'+
          'Thank you for your registration to the National Land Summit 2018! You will be notified ' +
          'once your office confirmed your participation in this event.<br/><br/>' +
          'Very truly yours,<br/><br/>' +
          'Web Team<br/>National Land Summit 2018'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

routes(app, connection);

app.listen(app.get('port'), function() {
    console.log('LMB is running on port', app.get('port'));
});
