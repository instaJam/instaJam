angular.module('instajam').controller('frFeedCtrl', function($scope, Chats,$cordovaGeolocation, userService){
  $scope.test = "hey it works";
  $scope.chats = Chats.all();

  userService.getCurrentUser().then(function(data){
      $scope.currentUser = data.data;
  });

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

      var cord = {lat: position.coords.latitude,
          long:position.coords.longitude
        }

      console.log(cord);
      userService.editUserLoc(cord, $scope.currentUser._id)
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


  watch.clearWatch();
  // OR
})
