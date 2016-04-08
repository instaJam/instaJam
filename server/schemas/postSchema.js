var mongoose = requre('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    content: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

postSchema.pre('find', function(next) {
    this.populate('user');
    next();
})

module.exports = mongoose.model('Post', postSchema);
