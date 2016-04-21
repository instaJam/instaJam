angular.module('instajam').controller('chatCtrl', function($scope, chatService, userService, Chats, $state) {

$scope.createChat = function(clickedUserId, currentUserId) {
    chatService.createChat(clickedUserId, currentUserId)
    .then(function(response) {
        $state.go('tab.chat-detal', {chatId: response})
    })
}
// chatService.getChats().then(function(res){
//     $scope.allChats = res.data;
//     console.log($scope.allChats);
// })

chatService.getUserChats().then(function(response) {
    $scope.allChats = response;
    console.log($scope.allChats[0].username)
})

$scope.remove = function(id, toUser) {
chatService.deleteChat(id, toUser).then(function(res){
$state.reload('tab.chats')
});
};

});
