var Chat = require('../schemas/messageSchema.js');
var User = require('../schemas/userSchema.js');

module.exports = {
    createChat: function(req, res, next) {
        var fromUser = req.user;
        var toUser = req.params.toUser;
        var chat = new Chat(req.body);
        chat.save(function(err, response) {
            if (err) res.status(500).send(err);
            else {
                User.findByIdAndUpdate(fromUser, {$push: {'chats': response._id}}, function(err, stuff) {
                    if (err) console.log(err);
                })
                User.findByIdAndUpdate(toUser, {$push: {'chats': response._id}}, function(err, stuff) {
                    if (err) console.log(err);
                })
                res.status(200).send(response);
            }
        })
    },
    getChats:function(req, res, next){
        if (req.query.chat) {
                Chat.findById(req.query.chat).populate("toUser fromUser messages.toUser messages.fromUser").exec(function(err, response) {
                    err ? res.status(500).send(err) : res.status(200).send(response)
                })
            } else {
                Chat.find().populate("toUser fromUser messages.toUser messages.fromUser").exec(function(err, response) {
                    err ? res.status(500).send(err) : res.status(200).send(response)
                })
            }
    },
    deleteMessage: function (req, res) {
    var id = req.params.id;
    Message.findByIdAndRemove(id, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });
},deleteChat: function (req, res) {
      var id = req.params.id;
      var toUser = req.params.toUser;
      Chat.findByIdAndRemove(id, function (err, resp) {
          if (err) {
              res.status(500).json(err);
          }     else {
                  User.findByIdAndUpdate(req.user, {$pull: {'chats':
                  id}}, function(err, stuff) {
                      if (err) console.log(err);
                  })
                  User.findByIdAndUpdate(toUser, {$pull: {'chats':id}}, function(err, stuff) {
                      if (err) console.log(err);
                  })
                  res.status(200).send(resp);
              }
      });
  },
  addMessageToChat: function(req, res){
      var id = req.params.id;
      var update = {$push:{"messages":req.body}};
      Chat.findByIdAndUpdate(id, update, function(err,resp){
          if(err) return err;
      })
  }
};
