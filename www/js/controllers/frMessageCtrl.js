angular.module("instajam").controller("messageCtrl", function($scope, Chats, $stateParams) {
  $scope.chat = Chats.get($stateParams.chatId);

  $scope.$on('new message', function(event, msg) {
      console.log("something in  here")
        $scope.message = msg;
  });
  $scope.sendMsg = function(msg) {
    $scope.$emit("client message", msg);
  }
});
