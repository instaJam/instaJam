angular.module('instajam').controller('frFeedCtrl', function($scope, Chats,$state,$auth, userService, postService){
  $scope.test = "hey it works";
  $scope.chats = Chats.all();

  userService.getCurrentUser().then(function(res){
      console.log(res.data);
              $scope.currentUser = res.data;
          })


  $scope.logout = function(){
      $auth.logout().then(function(res){
          $state.go('login');
      });
  }
  $scope.getAllPosts = function() {
    postService.getAllPosts().then(function(res) {
        $scope.allPosts = res.data;
      })
    }
  $scope.likesCounter = function (likesArray) {
    return likesArray.length;
  }
  $scope.like = function(userId, postId){
    postService.like(userId, postId).then(function(res){
      $scope.getAllPosts();
      $scope.likesCounter();
      })
  }
  $scope.getAllPosts();

})
