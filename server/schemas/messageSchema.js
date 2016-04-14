var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message: [{
        content: {type: String, required: true},
        fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        toUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        date: {type: Date, default: new Date()}
    }],
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    toUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

messageSchema.pre('find', function(next) {
    this.populate('fromUser toUser message.fromUser message.toUser');
    next();
})

module.exports = mongoose.model('Message', messageSchema);
