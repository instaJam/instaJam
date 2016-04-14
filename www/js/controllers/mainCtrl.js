angular.module("instajam").controller("mainCtrl", function($scope) {


    $scope.$on('client message', function(event, msg){
      socket.emit("ctrl message", msg);
    });

  socket.on('message from socket',function(msg){
    $scope.$broadcast('new message', msg);
  });




});
