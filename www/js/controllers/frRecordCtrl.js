angular.module('instajam').controller('frRecordCtrl', function($scope, $state, $auth, userService, postService, $cordovaGeolocation, $q, chatService){

  userService.getCurrentUser().then(function(data){
      $scope.profile = data.data;
  });
$scope.showYoutube = false;

$scope.youtubeShower = function() {
    $scope.showYoutube = !$scope.showYoutube;
}
$scope.showPicture = false;

$scope.pictureShower = function() {
    $scope.showPicture = !$scope.showPicture;
}

$scope.postVid = function(data, user){
  postService.postContent(data, user).then(function(res){
  $scope.youtubeShower();
  $scope.search_query.setPristine();
  $scope.postInput.setPristine();

})
}




});
