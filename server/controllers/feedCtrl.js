var Post = require('../schemas/postSchema.js');

module.exports = {
    addPost: function(req, res){
        var post = new Post(req.body);
        post.save(function(err, data){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(200).send(data);
            }
        });
    },
    getAllPosts: function (req, res) {
     Post.find({}, function (err, resp) {
             if (err) {
                 res.status(500).json(err);
             } else {
                 res.status(200).json(resp);
             }
         });
    }
}
