angular.module("instajam").service("postService", function($http) {

this.getAllPosts = function(){
    return $http({
        method:"GET",
        url:"/api/post"
    });
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
});
