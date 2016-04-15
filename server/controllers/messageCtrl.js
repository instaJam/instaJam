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
                console.log(response);
            }
        })
    },
    getChats:function(req, res, next){
        Chat.find({}, function(err, resp){
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        })
    },
    addMessage: function(req, res){
            Chat.findById(req.params.id, function(err, user){
                if(err){
                    res.status(500).send(err)
                }else{
                    chats.messages.push(req.body);
                    chats.save(function(err, data){
                        if(err){
                            res.status(500)
                        }else{
                            res.send(data)
                        }
                    })
                }
            })

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
                  console.log(resp);
              }
      });
  },
};
