angular.module('instajam').controller('chatCtrl', function($scope, chatService, userService, Chats, $state) {

$scope.createChat = function(clickedUserId, currentUserId) {
    chatService.createChat(clickedUserId, currentUserId)
    .then(function(response) {
        $state.go('tab.chat-detal', {chatId: response})
    })
}

userService.getCurrentUser().then(function(response) {
    $scope.currentUser = response.data;
})
<<<<<<< HEAD

=======
>>>>>>> 56d45d51624968589517a42790a39ea47f6ab4f6
chatService.getUserChats().then(function(response) {
    $scope.allChats = response;
})

$scope.remove = function(id, toUser) {
chatService.deleteChat(id, toUser).then(function(res){
$state.reload('tab.chats')
});
};

});
