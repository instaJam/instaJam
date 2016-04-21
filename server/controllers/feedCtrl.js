var Post = require('../schemas/postSchema.js');
var User = require('../schemas/userSchema.js');

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
     Post.find({}).populate("comments.user").exec(function (err, resp) {
             if (err) {
                 res.status(500).json(err);
             } else {
                 res.status(200).json(resp);
             }
         });
    },
    addLike: function(req, res, next){
      Post.findById(req.body.postId, function(err, post){
        if (err) {
          res.status(500).json(err);
        }else {
          post.likes.push(req.body.userId);
          post.save(function(err, data) {
            if (err){
              res.status(500).send(err);
            }else {
              res.status(200).json(data);
            }
          });
        }
      })
    },
    removeLike: function(req, res, next){
      Post.findById(req.body.postId, function(err, post){
        if (err) {
          res.status(500).json(err);
        }else {
          post.likes.splice(post.likes.indexOf(req.body.userId, 0), 1);
        }
          post.save(function(err, data) {
            if (err){
              res.status(500).send(err);
            }else {
              res.status(200).json(data);
            }
          });
        })
  },
  getUserPosts: function(req, res, next) {
      var id = req.user;
      Post.find({'user': id}, function(err, response) {
          err ? res.status(500).send(err) : res.status(200).send(response);
      })
  },
  submitComment: function(req, res, next) {
    Post.findById(req.body.postId, function(err, post){
      if (err) {
        res.status(500).json(err);
      }else {
        post.comments.push({user: req.body.userId, comment: req.body.newComment});
        post.save(function(err, data) {
          if (err){
            res.status(500).send(err);
          }else {
            res.status(200).json(data);
          }
        })
      }
    })
  },
  deleteComment: function(req, res, next) {
    Post.findById(req.body.postId, function(err, post) {
      if (err) {
        res.status(500).json(err);
      }else {
        post.comments.splice(req.body.commentIndex, 1);
      }
      post.save(function(err, data) {
        if (err){
          res.status(500).send(err);
        }else {
          res.status(200).json(data);
        }
      });
    })
},  addLocToPost: function(req, res, next) {
      Post.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
        if (err) res.status(500).json(err);
        else res.status(200).json(response);
      })
  },
  getFollowingPosts: function(req, res, next) {
      User.findById(req.user, function(err, response) {
          if (err) res.status(500).send(err)
          else {
              Post.find({ $or: [{ user: {$in: response.following}}, {user: req.user}]}, function(err, response) {
                  err ? res.status(500).send(err) : res.status(200).send(response)
              })
          }
      })
  }
}
