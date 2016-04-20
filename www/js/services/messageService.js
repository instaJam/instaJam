angular.module("instajam").service("messageSrvc", function($http, $stateParams) {

    this.postMessage = function(msg){

      $http.post('/api/message', msg);

    };

    this.getChatDetail = function(){
        return $http({
            method:"GET",
            url:'/api/chat/?chat=' + $stateParams.chatId
        })
    }

    this.getChatDetailResolve = function(chatID){
        return $http({
            method:"GET",
            url:'/api/chat/?chat=' + chatID.chatId
        })
    }



});
