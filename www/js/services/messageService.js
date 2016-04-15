angular.module("instajam").service("messageSrvc", function($http) {

    this.postMessage = function(msg){

      $http.post('/api/message', msg);

    };

    this.postMessageById= function(newMsg, id){
        console.log(id,"here is id");
      return $http({
        method:"POST",
        data: newMsg,
        url:'/api/message' + id,

    });
    };
});
