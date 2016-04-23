angular.module('instajam').controller('frRecordCtrl', function($scope, $state, $auth, userService, postService, $cordovaGeolocation, $q, chatService){

  userService.getCurrentUser().then(function(data){
      $scope.profile = data.data;
  });


$scope.postVid = function(data, user){
  postService.postContent(data, user).then(function(res){
})
}




});
