var Chat = require('../schemas/messageSchema.js');
var User = require('../schemas/userSchema.js');

var newChat = function(fromUser, toUser, req, res) {
  var chat = new Chat(req);
  chat.save(function(err, response) {
    if (err) res.status(500).send(err);
    else {
      User.findByIdAndUpdate(fromUser, {
        $push: {
          'chats': response._id
        }
      }, function(err, stuff) {
        if (err) console.log(err);
      });
      User.findByIdAndUpdate(toUser, {
        $push: {
          'chats': response._id
        }
      }, function(err, stuff) {
        if (err) console.log(err);
      });
      res.status(200).send(response);
    }
  });
}

module.exports = {
    createChat: function(req, res, next) {
      var fromUser = req.user;
      var toUser = req.params.toUser;
      Chat.find({}, function(err, resp) {
        if (err) {
          res.status(500).send(err);
        } else if (!resp.length) {
          newChat(fromUser, toUser, req.body, res);
        } else if (resp.length) {
          for (var i = 0; i < resp.length; i++) {
            if (
              (fromUser == resp[i].fromUser ||
                fromUser == resp[i].toUser) &&
              (toUser == resp[i].toUser ||
                toUser == resp[i].fromUser)) {
              return res.status(200).send('chat already exists')

            }
          }
          return newChat(fromUser, toUser, req.body, res);
        }
      })



    },
        getChats: function(req, res, next) {
          if (req.query.chat) {
            Chat.findById(req.query.chat).populate("toUser fromUser messages.toUser messages.fromUser").exec(function(err, response) {
              err ? res.status(500).send(err) : res.status(200).send(response);
            });
          } else {
            Chat.find().populate("toUser fromUser messages.toUser messages.fromUser").exec(function(err, response) {
              err ? res.status(500).send(err) : res.status(200).send(response);
            });
          }
        },
        deleteMessage: function(req, res) {
          var id = req.params.id;
          Message.findByIdAndRemove(id, function(err, resp) {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(resp);
            }
          });
        }, deleteChat: function(req, res) {
          var id = req.params.id;
          var toUser = req.params.toUser;
          Chat.findByIdAndRemove(id, function(err, resp) {
            if (err) {
              res.status(500).json(err);
            } else {
              User.findByIdAndUpdate(req.user, {
                $pull: {
                  'chats': id
                }
              }, function(err, stuff) {
                if (err) console.log(err);
              });
              User.findByIdAndUpdate(toUser, {
                $pull: {
                  'chats': id
                }
              }, function(err, stuff) {
                if (err) console.log(err);
              });
              res.status(200).send(resp);
            }
          });
        },
        addMessageToChat: function(req, res) {
          var id = req.params.id;
          var update = {
            $push: {
              "messages": req.body
            }
          };
          Chat.findByIdAndUpdate(id, update, function(err, resp) {
            if (err) return err;
          });
        },
        getUserChats: function(req, res, next) {
          Chat.find('toUser._id === req.user || fromUser._id === req.user').populate('toUser fromUser messages.toUser messages.fromUser').exec(function(err, response) {
            err ? res.status(500).send(err) : res.status(200).send(response);
          });
        }

    };
