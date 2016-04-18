angular.module('instajam').controller('chatCtrl', function($scope, chatService, userService) {

$scope.createChat = function(clickedUserId, currentUserId) {
    chatService.createChat(clickedUserId, currentUserId)
    .then(function(response) {
        $state.go('tab.chat-detal', {chatId: response})
    })
}


});
