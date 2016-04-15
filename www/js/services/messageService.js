angular.module("instajam").service("messageSrvc", function($http, $stateParams) {

    this.postMessage = function(msg){

      $http.post('/api/message', msg);

    };

    this.postMessage= function(msg, toUser,fromUser){
      return $http({
        method:"POST",
        data: {content:msg, 
                toUser:toUser,
                fromUser:fromUser
            },
        url:'/api/message/' + $stateParams.chatId

        });
    };
    this.getChatDetail = function(){
        return $http({
            method:"GET",
            url:'/api/chat/?chat=' + $stateParams.chatId
        })
    }



});
