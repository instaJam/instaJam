var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    content: String,
    description: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, comment: String}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    loc:{}
}, {timestamps: true})

postSchema.pre('find', function(next) {
    this.populate('user');
    next();
})

module.exports = mongoose.model('Post', postSchema);
