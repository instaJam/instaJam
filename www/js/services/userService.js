angular.module("instajam").service("userService", function($http) {

this.getCurrentUser = function(){
    return $http({
        method:"GET",
        url:"/api/me"
    });
}

this.editUserLoc = function(info, id){
    return $http({
        method:"PUT",
        url:'/api/user/' + id,
        data:{loc: info}
    })
}

this.editUser = function(user){
    return $http({
        method:"PUT",
        url:'/api/user/' + user._id,
        data:user
    })
}

});
