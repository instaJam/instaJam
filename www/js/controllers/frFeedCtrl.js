angular.module('instajam').controller('frFeedCtrl', function($scope, Chats,$state,$auth, userService, postService,$cordovaGeolocation,$q, chatService,$ionicActionSheet, $timeout){
  $scope.showDistance = 5;
  $scope.doRefresh = function() {
    postService.getAllPosts().then(function(res) {
        $scope.allPosts = res;
        postService.getFollowingPosts().then(function(response) {
            $scope.followingPosts = response;
        })
          }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
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
      userService.editUserLoc(cord, $scope.currentUser._id).then(function(response) {
          userService.getAllUsers().then(function(res) {
              $scope.allUsers = res;
          })
      })
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
        };

        console.log(cord);
        userService.editUserLoc(cord, $scope.currentUser._id).then(function(response) {
            userService.getAllUsers().then(function(res) {
                $scope.allUsers = res;
                console.log($scope.allUsers)
            })
        })
    })
    $scope.isYoutubeArray= [];
    $scope.youtubeChecker = function(content, $index){
    //   console.log(content.indexOf("youtu"));
      if (content.indexOf("youtu") !== -1) {
        $scope.isYoutubeArray[$index] = true;
      }
    }

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
          $scope.allPosts = res;
        })
      }

    $scope.getFollowingPosts = function() {
        postService.getFollowingPosts().then(function(response) {
            $scope.followingPosts = response;
            console.log($scope.followingPosts);
        })
    }
    $scope.getFollowingPosts();

  $scope.submitComment = function (userId, postId, newComment, showIndex) {
    postService.submitComment(userId, postId, newComment).then(function(res) {
      $scope.getAllPosts();
      $scope.getFollowingPosts();
      $scope.commentToggle(showIndex);
    })
  }
  $scope.deleteComment = function (postId, commentIndex, showIndex) {
    postService.deleteComment(postId, commentIndex).then(function(res) {
      $scope.getAllPosts();
      $scope.getFollowingPosts();
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
        $scope.getFollowingPosts();
      });

    }else {
      postService.dislike(userId, postId).then(function(res) {
        $scope.getAllPosts();
        $scope.getFollowingPosts();
    });
  }
}
  $scope.getAllPosts();

  $scope.getFollowingPosts = function() {
      postService.getFollowingPosts().then(function(response) {
          $scope.followingPosts = response;
          console.log($scope.followingPosts);
      })
  }
  $scope.getFollowingPosts();

  userService.getCurrentUser().then(function(data){
      $scope.currentUser = data.data;
  });
  $scope.deleteCommentToggle = function(userId) {
    if ($scope.currentUser) {
      if (userId.toString() === $scope.currentUser._id.toString()){
        $scope.deleteCommentHider = true;
      }else {
        $scope.deleteCommentHider = false;
      }
    }else {
      $scope.deleteCommentHider = false;
    }
  }


  $scope.createChat = function(clickedUserId, currentUserId) {
      chatService.createChat(clickedUserId, currentUserId)
      .then(function(response) {
          $state.go('tab.chats')
      })
  }

  $scope.followUser = function(userId) {
      postService.followUser(userId)
  }

  $scope.getUser = function(id) {
    userService.getUserProfile(id)
    .then(function(response){
      $scope.postUser = response.data;
    });
  };

  $scope.show = function() {

     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 5  + " miles"},
         { text: 10  + " miles"},
         { text: 15  + " miles"},
         { text: 25  + " miles"},
         { text: 50  + " miles"}
       ],
       titleText: 'Select Distance',
       cancelText: 'Cancel',

       buttonClicked: function(index) {
           switch (index) {
               case 0: day = $scope.showDistance = 5;
                   break;
               case 1: day = $scope.showDistance = 10;
                   break;
               case 2: day = $scope.showDistance = 15;
                   break;
               case 3: day = $scope.showDistance = 25;
                   break;
               case 4: day = $scope.showDistance = 50;
                   break;
           }
           hideSheet();
           console.log($scope.showDistance);
       }
     });

     // For example's sake, hide the sheet after two seconds


   };

});
