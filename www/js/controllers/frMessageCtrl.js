angular.module("instajam").controller("messageCtrl", function($scope, Chats, $stateParams, chatService, userService, messageSrvc, currentUser) {
  // $scope.chat = Chats.get($stateParams.chatId);

  $scope.$on('new message', function(event, msg) {
    console.log("something in  here")
    $scope.message = msg;
  });
  $scope.sendMsg = function(msg, id) {
    messageSrvc.postMessage(msg, id);
    $scope.$emit("client message", msg);
  }



  messageSrvc.getChatDetail().then(function(data) {
    $scope.chat = data.data
  });

  $scope.currentUser = currentUser;


  $scope.addMessageToChat = function(currentUser, toUser, data, fromUser) {
      if (toUser._id === currentUser._id) {
          toUser = fromUser;
      }
      chatService.addMessageToChat(currentUser, toUser, data);
      messageSrvc.getChatDetail().then(function(data) {
      $scope.chat = data.data
    });
  }
  userService.getCurrentUser().then(function(res) {
    $scope.currentUser = res.data;
  });

});
