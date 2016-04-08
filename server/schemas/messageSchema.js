var mongoose = requre('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message:{type: String, required: true},
    location:{type: String},
    fromUser:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    toUser:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
}, {timestamps: true})

messageSchema.pre('find', function(next) {
    this.populate('fromUser toUser');
    next();
})

module.exports = mongoose.model('Message', messageSchema);
