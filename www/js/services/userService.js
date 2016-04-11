angular.module("instajam").service("userService", function($http) {

this.getCurrentUser = function(){
    return $http({
        method:"GET",
        url:"/api/me"
    });
}

});
