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
    addMessage: function(req, res){
        var message = new Message(req.body);
        message.save(function(err, data){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(data);
            }
        });
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
}
};
