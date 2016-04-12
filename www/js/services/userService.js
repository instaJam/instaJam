angular.module("instajam").service("userService", function($http) {

this.getCurrentUser = function(){
    return $http({
        method:"GET",
        url:"/api/me"
    });
}

this.editUser = function(user){
    return $http({
        method:"PUT",
        url:'/api/user/' + user._id,
        data:user
    })
}
});
