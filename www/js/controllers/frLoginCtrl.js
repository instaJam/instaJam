angular.module('instajam').controller('frLoginCtrl', function($scope, $auth){

    $scope.login = function(user) {
        $auth.login(user);
    }

    $scope.signUp = function(user) {
        $auth.signup(user);
    }

})
