var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
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

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log("Server Connected");
});

console.log("HEllo");
// var delay;

// delay = function(ms, cb) {
//   return setTimeout(cb, ms);
// };

// process.once('SIGUSR2', function() {
//   console.log('Doing shutdown tasks...');
//   return delay(5000, function() {
//     console.log('All done, exiting');
//     return process.kill(process.pid, 'SIGUSR2');
//   });
// });

// delay(99999999, function() {
//   return console.log('App exiting naturally');
// });
