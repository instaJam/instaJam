angular.module('instajam').controller('frLoginCtrl', function($scope, $auth, $state,$ionicModal){


    //
    // $ionicModal.fromTemplateUrl('login.html',{
    //       scope: $scope,
    //       animation: 'slide-in-up'
    //    }).then(function(modal) {
    //       $scope.modal = modal;
    //    });
    //
    //    $scope.openModal = function() {
    //       $scope.modal.show();
    //    };
    //
    //    $scope.closeModal = function() {
    //       $scope.modal.hide();
    //    };
    //
    //    //Cleanup the modal when we're done with it!
    //    $scope.$on('$destroy', function() {
    //       $scope.modal.remove();
    //    });
    //
    //    // Execute action on hide modal
    //    $scope.$on('modal.hidden', function() {
    //       // Execute action
    //    });
    //
    //    // Execute action on remove modal
    //    $scope.$on('modal.removed', function() {
    //       // Execute action
    //    });

       $ionicModal.fromTemplateUrl('login.html', {
             id: '1', // We need to use and ID to identify the modal that is firing the event!
             scope: $scope,
             backdropClickToClose: false,
             animation: 'slide-in-up'
           }).then(function(modal) {
             $scope.oModal1 = modal;
           });

           // Modal 2
           $ionicModal.fromTemplateUrl('signUp.html', {
             id: '2', // We need to use and ID to identify the modal that is firing the event!
             scope: $scope,
             backdropClickToClose: false,
             animation: 'slide-in-up'
           }).then(function(modal) {
             $scope.oModal2 = modal;
           });

           $scope.openModal = function(index) {

             if (index ===1) $scope.oModal1.show();
             else $scope.oModal2.show();
           };

           $scope.closeModal = function(index) {
             if (index ===1) $scope.oModal1.hide();
             else $scope.oModal2.hide();
           };

           /* Listen for broadcasted messages */

           $scope.$on('modal.shown', function(event, modal) {
             console.log('Modal ' + modal.id + ' is shown!');
           });

           $scope.$on('modal.hidden', function(event, modal) {
             console.log('Modal ' + modal.id + ' is hidden!');
           });

           // Cleanup the modals when we're done with them (i.e: state change)
           // Angular will broadcast a $destroy event just before tearing down a scope
           // and removing the scope from its parent.
           $scope.$on('$destroy', function() {
             console.log('Destroying modals...');
             $scope.oModal1.remove();
             $scope.oModal2.remove();
           });





    $scope.login = function(user){
        $auth.login(user).then(function(res){
            $scope.oModal1.hide().then(function(){
                $state.go('tab.frFeed');

            });
        });
    }

    $scope.signUp = function(user) {
        $auth.signup(user).then(function(response) {
             $auth.setToken(response.data.token);
             $scope.oModal2.hide().then(function(){
                 $state.go('tab.frFeed');

             });        });
    }

    $scope.logout = function(){
        $auth.logout().then(function(res){
            $state.go('login');
        });
    }




})
