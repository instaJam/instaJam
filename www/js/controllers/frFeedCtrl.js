angular.module('instajam').controller('frFeedCtrl', function($scope, Chats,$state,$auth, userService, postService,$cordovaGeolocation,$q, chatService){
  $scope.test = "hey it works";
  $scope.chats = Chats.all();

  $scope.logout = function(){
      $auth.logout().then(function(res){
          $state.go('login');
      });
  }
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

      var cord = {lat: position.coords.latitude,
          long:position.coords.longitude
        }

      console.log(cord);
      userService.editUserLoc(cord, $scope.currentUser._id);
    }, function(err) {
      console.log(err);
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      console.log(err);
    },
    function(position) {
        var cord = {lat: position.coords.latitude,
            long:position.coords.longitude
          }

        console.log(cord);
        userService.editUserLoc(cord, $scope.currentUser._id)
  });
    $scope.getAllUsers = function(){
        userService.getAllUsers().then(function(res){
            console.log(res)
            $scope.allUsers = res;
        })
    }
    $scope.getAllUsers();

  watch.clearWatch();
  $scope.commentHiderArray = [];
  $scope.commentToggle = function ($index) {
    if ($scope.commentHiderArray[$index] !== true){
      $scope.commentHiderArray[$index] = true;
    }else {
      $scope.commentHiderArray[$index] = false;
    }
    }

    $scope.getAllPosts = function() {
      postService.getAllPosts().then(function(res) {
          console.log(res)
          $scope.allPosts = res;
        })
      }

  $scope.submitComment = function (userId, postId, newComment, showIndex) {
    postService.submitComment(userId, postId, newComment).then(function(res) {
      $scope.getAllPosts();
      $scope.commentToggle(showIndex);
    })
  }
  $scope.deleteComment = function (postId, commentIndex, showIndex) {
    postService.deleteComment(postId, commentIndex).then(function(res) {
      $scope.getAllPosts();
      $scope.commentToggle(showIndex);
  })

  }
  $scope.likesCounter = function (likesArray) {
    return likesArray.length;
  }

  $scope.like = function(userId, postId, likes){
    if (likes.indexOf(userId, 0) === -1){
      postService.like(userId, postId).then(function(res){
        $scope.getAllPosts();
      });

    }else {
      postService.dislike(userId, postId).then(function(res) {
        $scope.getAllPosts();
    });
  }
}
  $scope.getAllPosts();

  userService.getCurrentUser().then(function(data){
      $scope.currentUser = data.data;
  });
  $scope.deleteCommentToggle = function(userId) {

    if (userId.toString() === $scope.currentUser._id.toString()){
      $scope.deleteCommentHider = true;
    }else {
      $scope.deleteCommentHider = false;
    }
  }


  $scope.createChat = function(clickedUserId, currentUserId) {
      chatService.createChat(clickedUserId, currentUserId)
      .then(function(response) {
          $state.go('tab.chat-detail', {chatId: response})
      })
  }


  // OR
})
