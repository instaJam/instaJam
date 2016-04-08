var Message = require('../schemas/messageSchema.js');

module.exports = {
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
