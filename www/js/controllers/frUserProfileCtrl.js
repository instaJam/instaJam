angular.module('instajam').controller('frUserProfileCtrl', function($scope,$state,$auth, userService){

    userService.getCurrentUser().then(function(res){
                $scope.currentUser = res.data;
            })


    $scope.logout = function(){
        $auth.logout().then(function(res){
            $state.go('login');
        });
    }




})
