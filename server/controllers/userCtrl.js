var User = require('../schemas/userSchema');


module.exports = {
addUser: function(req, res){
    var user = new User(req.body);
    user.save(function(err, data){
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
},
getAllUsers: function (req, res) {
 User.find({}, function (err, resp) {
         if (err) {
             res.status(500).json(err);
         } else {
             res.status(200).json(resp);
         }
     });
},
updateUser: function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
    if (err) res.status(500).json(err);
    else res.status(200).json(response);
  })
 },
 deleteUser: function (req, res) {
       var id = req.params.id;
       User.findByIdAndRemove(id, function (err, resp) {
           if (err) {
               res.status(500).json(err);
           } else {
               res.status(200).json(resp);
           }
       });
   },

    getUser: function (req, res) {
        var id = req.params.id;
        User.findById(id, function (err, resp) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(resp);
                }
            });
    }

}
