angular.module('instajam').controller('frLoginCtrl', function($scope, $auth,$state){

    $scope.login = function(user){
        $auth.login(user).then(function(res){
            $state.go('tab.frFeed');
        });
    }

    $scope.signUp = function(user) {
        $auth.signup(user).then(function(response) {
             $auth.setToken(response.data.token);
             $state.go('tab.frFeed');
        });
    }
    $scope.logout = function(){
        $auth.logout().then(function(res){
            $state.go('login');
        });
    }

})
