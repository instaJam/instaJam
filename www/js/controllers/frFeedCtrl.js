angular.module('instajam').controller('frFeedCtrl', function($scope, Chats){
  $scope.test = "hey it works";
  $scope.chats = Chats.all();

})
