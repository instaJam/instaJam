angular.module('instajam').controller('frLoginCtrl', function($scope, $auth, $state){

    $scope.login = function(user) {
        $auth.login(user);
    }

    $scope.signUp = function(user) {
        $auth.signup(user).then(function(response) {
            console.log(response);
            $auth.setToken(response.data.token);
            $state.go('tab.dash');
        })
    }

})
