angular.module("instajam").controller("messageCtrl", function($scope, Chats, $stateParams, chatService, userService, messageSrvc, currentUser, chatDetail) {
  // $scope.chat = Chats.get($stateParams.chatId);

    $scope.currentUser = currentUser;
    $scope.chat = chatDetail;

  $scope.$on('new message', function(event, msg) {
    console.log("something in  here")
    $scope.message = msg;
  });
  $scope.sendMsg = function(msg, id) {
    messageSrvc.postMessage(msg, id);
    $scope.$emit("client message", msg);
  }


  $scope.addMessageToChat = function(currentUser, toUser, data, fromUser) {
      if (toUser._id === currentUser._id) {
          toUser = fromUser;
      }
      chatService.addMessageToChat(currentUser, toUser, data);
      messageSrvc.getChatDetail().then(function(data) {
      $scope.chat = data.data
    });
  }

});
