var express = require('express');
var app = express();
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require('mongoose');
var hbsutils = require('hbs-utils')(hbs);
var routes = require('./lib/routes');
// Connect to MongoDB
mongoose.connect('mongodb://localhost/lmb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB.');
});
// Set port to 5000
app.set('port', (process.env.PORT || 5000));
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

routes(app);

app.listen(app.get('port'), function() {
  console.log('LMB is running on port', app.get('port'));
});
