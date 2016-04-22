angular.module("instajam").service("postService", function($http, $stateParams) {


    function distance(lat1, lon1, lat2, lon2) {
     var p = 0.017453292519943295;    // Math.PI / 180
     var c = Math.cos;
     var a = 0.5 - c((lat2 - lat1) * p)/2 +
             c(lat1 * p) * c(lat2 * p) *
             (1 - c((lon2 - lon1) * p))/2;

     return Math.ceil(7917.5117 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    }

    this.getAllPosts = function(){
        return $http({
        method:'GET',
        url:'/api/post'
    }).then(function(res){
        for(var i = 0; i < res.data.length; i++){
          var curLong =res.data[0].user.loc.long;
          var curLat =res.data[0].user.loc.lat;
          var savedLong =res.data[i].user.loc.long;
          var savedLat =res.data[i].user.loc.lat;

          var point = distance(curLat, curLong, savedLat, savedLong);
          res.data[i].distance = point;
          }

          return res.data;
        })
    }

    this.getFollowingPosts = function() {
        return $http({
            method: 'GET',
            url: '/api/post/following'
        }).then(function(response) {
            return response.data
        })
    }

this.like = function(userId, postId){
  return $http({
    method: "POST",
    url: "api/post/likes",
    data: {
      userId: userId,
      postId: postId
    }
  })
}
this.dislike = function(userId, postId){
  return $http({
    method: "POST",
    url: "api/post/dislike",
    data: {
      userId: userId,
      postId: postId
    }
  })
}
this.submitComment = function (userId, postId, newComment) {
  return $http({
    method: "POST",
    url: "api/post/submitComment",
    data: {
      postId: postId,
      userId: userId,
      newComment: newComment
    }
  })
}
this.deleteComment = function(postId, commentIndex) {
  return $http({
    method: "POST",
    url: "api/post/deleteComment",
    data: {
      postId: postId,
      commentIndex: commentIndex
    }
  })
}

this.postContent = function(data, user){
    return $http({
        method:"POST",
        url:'/api/post',
        data:{
            content: data,
            user: user
        }
    })
}
this.followUser = function(followUser){
    return $http({
        method:"POST",
        url:'/api/user/follow/'+ followUser
    })
}
});
