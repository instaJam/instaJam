var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
var app = express();


///////////////
//MIDDLEWARE//
/////////////
app.use(bodyParser.json());
app.use(express.static('../www'));


//////////////////
//CONNECT TO DB//
////////////////
mongoose.connect('mongodb://localhost/instajam', function(err) {
    if (err) throw err;
});
mongoose.connection.once('open', function() {
    console.log('Connected To MongoDB!!!');
});


app.listen(port, () => console.log('There\'s a party on port ', port));
