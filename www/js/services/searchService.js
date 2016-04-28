angular.module("instajam").service("searchService", function($http) {




    this.getAllUsers = function(){
        return $http({
        method:'GET',
        url:'/api/user'
    }).then(function(res){
        return res
    })
    }

});
