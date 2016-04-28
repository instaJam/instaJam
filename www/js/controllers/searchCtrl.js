angular.module("instajam").controller("searchCtrl", function($scope, searchService, userService, $ionicLoading, $timeout) {

    $scope.name = "mike"

    // searchService.getAllUsers().then(function(res){
    //     console.log(res)
    //     $scope.allUsers = res.data
    //
    // })




  // Setup the loader
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
  $timeout(function () {
      searchService.getAllUsers().then(function(res){
              $ionicLoading.hide()
          $scope.allUsers = res.data

      })

;
}, 1000);
});
