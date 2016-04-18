angular.module("instajam").controller("messageCtrl", function($scope, Chats, $stateParams, chatService, userService, messageSrvc) {
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

      console.log(data.data)
    $scope.chat = data.data
  });
  userService.getCurrentUser().then(function(resp) {
    $scope.currentUser = resp.data;
  });


  $scope.addMessageToChat = function(currentUser, toUser, data) {
    chatService.addMessageToChat(currentUser, toUser, data);
    messageSrvc.getChatDetail().then(function(data) {
      $scope.chat = data.data
    });
  }
  userService.getCurrentUser().then(function(res) {
    $scope.currentUser = res.data;
  });

});
