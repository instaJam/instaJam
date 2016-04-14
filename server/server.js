var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment');
var jwt = require('jwt-simple');
var cors = require('cors');

var userCtrl = require('./controllers/userCtrl.js')
var User = require('./schemas/userSchema.js');
var Keys = require('./keys.js');
var Amazon = require('./controllers/awsController.js');
var messageCtrl = require('./controllers/messageCtrl.js');
var feedCtrl = require('./controllers/feedCtrl.js');
var port = 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


///////////////
//MIDDLEWARE//
/////////////
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('../www'));

/////////////
//SOCKET.IO/
///////////


io.on('connection', function(socket) {
 console.log("Sockets listining on backend");
 socket.on('ctrl message', function(msg) {
   io.emit("message from socket", msg);
   console.log("surfs up!");
 });
});

http.listen(3000, function() {
  console.log('You are not one of us!!');
});


///////////////////
//USER ENDPOINTS//
/////////////////
app.post('/auth/login', userCtrl.userLogin);
app.post('/auth/signup', userCtrl.userSignUp);
app.post('/api/user', userCtrl.addUser);
app.get('/api/user', userCtrl.getAllUsers);
app.get('/api/user/:id', userCtrl.getUser);
app.put('/api/user/:id', userCtrl.updateUser);
app.delete('/api/user/:id', userCtrl.deleteUser);
app.get('/api/me', userCtrl.ensureAuthenticated, function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
});



/////////////
//Messages//
///////////
app.post('/api/message', messageCtrl.addMessage);
app.delete('/api/message/:id', messageCtrl.deleteMessage);

///////////////////
//FEED ENDPOINTS//
/////////////////
app.post('/api/post', feedCtrl.addPost);
app.get('/api/post', feedCtrl.getAllPosts);
app.get('/api/post/user', feedCtrl.getUserPosts);
app.post('/api/post/likes', feedCtrl.addLike);
app.post('/api/post/dislike', feedCtrl.removeLike);

///////////
//IMAGES//
/////////
app.post('/api/newimage', Amazon.saveImage);


//////////////////
//CONNECT TO DB//
////////////////
mongoose.connect('mongodb://localhost/instajam', function(err) {
    if (err) throw err;
});
mongoose.connection.once('open', function() {
    console.log('Connected To MongoDB!!!');
});

//
// app.listen(port, function() {
//      console.log('There\'s a party on port ', port);
//  })
