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


///////////////
//MIDDLEWARE//
/////////////
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('../www'));

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, Keys.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, Keys.TOKEN_SECRET);
}



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
app.get('/api/me', ensureAuthenticated, function(req, res) {
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


app.listen(port, function() {
     console.log('There\'s a party on port ', port);
 })
