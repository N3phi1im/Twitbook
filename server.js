var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

// Require models

require('./models/user');
require('./models/post');
require('./config/passport');

// Connect mongoose server

mongoose.connect('mongodb://localhost/twitbook');

// Routing

var userRoute = require('./routes/userRoute');
var postRoute = require('./routes/PostRoutes');

var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/', postRoute);
app.use('/api/Users', userRoute);

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log("Server Connected");
});