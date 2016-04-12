angular.module('instajam').controller('frUserProfileCtrl', function($scope,$state,$auth, userService){

    userService.getCurrentUser().then(function(res){
                $scope.currentUser = res.data;
            })


    $scope.logout = function(){
        $auth.logout().then(function(res){
            $state.go('login');
        });
    }

    $scope.userhide = true;

    $scope.userToggle = function() {
      $scope.userhide = $scope.userhide === false ? true: false;
    }

    $scope.editUser = function(user){
      console.log(user);
        userService.editUser(user)
        $scope.userhide = true;
    }


    $scope.editUser = function(user){
        userService.editUser(user)
    }

})
