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

})
