var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userCtrl = require('./controllers/userCtrl.js')
var messageCtrl = require('./controllers/messageCtrl.js');
var feedCtrl = require('./controllers/feedCtrl.js');
var port = 3000;
var app = express();


///////////////
//MIDDLEWARE//
/////////////
app.use(bodyParser.json());
app.use(express.static('../www'));






///////
//////ENDPOINTS
/////

//
//USER ENDPOINTS
//
app.post('/api/user', userCtrl.addUser);
app.get('/api/user', userCtrl.getAllUsers);
app.get('/api/user/:id', userCtrl.getUser);
app.put('/api/user/:id', userCtrl.updateUser);
app.delete('/api/user/:id', userCtrl.deleteUser);
//
//Messages/
//
app.post('/api/message', messageCtrl.addMessage);
app.delete('/api/message/:id', messageCtrl.deleteMessage);

///////////////////
//POST ENDPOINTS//
/////////////////
app.post('/api/post', feedCtrl.addPost);
app.get('/api/post', feedCtrl.getAllPosts);


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
