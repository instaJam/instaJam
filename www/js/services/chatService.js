angular.module('instajam').service('chatService', function($http) {

this.createChat = function(clickedUserId, currentUserId) {
    return $http({
        method: 'POST',
        url: '/api/chat/' + clickedUserId,
        data: {
            fromUser: currentUserId,
            toUser: clickedUserId
        }
    }).then(function(response) {
        return response.data._id;
    })
}
this.getChats = function(){
    return $http({
        method:"GET",
        url:"/api/chat"
    });
};
this.deleteChat =function(id, toUser){
    return $http({
        method:"DELETE",
        url:'/api/chat/' + id + "/"+  toUser
    });
    }
})
