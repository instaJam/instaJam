angular.module('instajam').controller('frUserProfileCtrl', function($scope, $http){

$scope.getCurrent = function() {
    return $http({
        method: 'GET',
        url: '/api/me'
    }).then(function(response) {
        $scope.currentUser = response.data;
    })
}

$scope.getCurrent();

})
