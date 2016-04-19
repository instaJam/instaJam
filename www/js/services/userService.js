angular.module("instajam").service("userService", function($http) {

this.getCurrentUser = function(){
    return $http({
        method:"GET",
        url:"/api/me"
    }).then(function(response) {
      return response;
    })
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

function distance(lat1, lon1, lat2, lon2) {
 var p = 0.017453292519943295;    // Math.PI / 180
 var c = Math.cos;
 var a = 0.5 - c((lat2 - lat1) * p)/2 +
         c(lat1 * p) * c(lat2 * p) *
         (1 - c((lon2 - lon1) * p))/2;

 return Math.ceil(7917.5117 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
}

this.getAllUsers = function(){
    return $http({
    method:'GET',
    url:'/api/user'
}).then(function(res){
    console.log(res.data.length)
    for(var i = 0; i < res.data.length; i++){

      var curLong =res.data[0].loc.long;
      var curLat =res.data[0].loc.lat;
      var savedLong =res.data[i].loc.long;
      var savedLat =res.data[i].loc.lat;

      var point = distance(curLat, curLong, savedLat, savedLong);
      res.data[i].distance = point;
      }

      return res.data;
    })
}


this.addPostLoc = function(info, id){
    return $http({
        method:"PUT",
        url:'/api/post/' + id,
        data:{loc: info}
    }).then(function(res){

    })
}




});
