angular.module('instajam.controllers', [])
.controller('ChatsCtrl', function($scope, Chats, chatService, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
            chatService.getChats().then(function(res){
                $scope.allChats = res.data;
      })
  $scope.chats = Chats.all();
  $scope.remove = function(id, toUser) {
      chatService.deleteChat(id, toUser).then(function(res){
          $state.reload('tab.chats')
      });
  };

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('AccountCtrl', function($scope, userService) {
  $scope.settings = {
    enableFriends: true
  };
  userService.getCurrentUser().then(function(res) {
      $scope.profile= res.data;
  })

});
