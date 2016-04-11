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

});
