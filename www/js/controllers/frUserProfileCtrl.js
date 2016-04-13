angular.module('instajam').controller('frUserProfileCtrl', function($scope,$state,$auth, userService){

    userService.getCurrentUser().then(function(res){
                $scope.currentUser = res.data;
            })


    $scope.logout = function(){
        $auth.logout().then(function(res){
            $state.go('login');
        });
    }


    $scope.userToggle = function() {
      var c = document.getElementById('usernameChange');
      var a = document.getElementById('userLabel')
      if (c.style.display === "block") {
        a.style.display="block";
        c.style.display="none";}
      else {
        a.style.display="none";      c.style.display="block";}

      // $scope.userhide = $scope.userhide === false ? true: false;
    }
    $scope.emailToggle = function() {
      var c = document.getElementById('emailChange');
      var a = document.getElementById('emailLabel')
      if (c.style.display === "block") {
        a.style.display="block";
        c.style.display="none";}
      else {
        a.style.display="none";      c.style.display="block";}

      // $scope.userhide = $scope.userhide === false ? true: false;
    }
    $scope.bioToggle = function() {
      var c = document.getElementById('bioChange');
      var a = document.getElementById('bioLabel')
      if (c.style.display === "block") {
        a.style.display="block";
        c.style.display="none";}
      else {
        a.style.display="none";      c.style.display="block";}

      // $scope.userhide = $scope.userhide === false ? true: false;
    }
    $scope.passwordToggle = function() {
      var c = document.getElementById('passwordChange');
      var a = document.getElementById('passwordLabel')
      if (c.style.display === "block") {
        a.style.display="block";
        c.style.display="none";}
      else {
        a.style.display="none";      c.style.display="block";}

      // $scope.userhide = $scope.userhide === false ? true: false;
    }

    $scope.editUser = function(user){
      console.log(user);
        userService.editUser(user)
        var c = document.getElementById('emailChange');
        var a = document.getElementById('userLabel')
        var d = document.getElementById('usernameChange');
        var b = document.getElementById('emailLabel')
        var f = document.getElementById('bioChange');
        var e = document.getElementById('bioLabel')
        var g = document.getElementById('passwordChange');
        var h = document.getElementById('passwordLabel')
        a.style.display="block";
        b.style.display="block";
        e.style.display="block";
        h.style.display="block";
        c.style.display="none";
        d.style.display="none";
        f.style.display="none";
        g.style.display="none";
    }

})
