angular.module('instajam').controller('chatCtrl', function($scope, chatService, userService, Chats, $state) {

$scope.createChat = function(clickedUserId, currentUserId) {
    chatService.createChat(clickedUserId, currentUserId)
    .then(function(response) {
        $state.go('tab.chat-detal', {chatId: response})
    })
}
chatService.getChats().then(function(res){
    $scope.allChats = res.data;
})
$scope.chats = Chats.all();
$scope.remove = function(id, toUser) {
chatService.deleteChat(id, toUser).then(function(res){
$state.reload('tab.chats')
});
};

});
