angular.module('instajam').directive('chatDetailDir', function() {



    return {
        restrict: 'A',
        scope: {
            currentUser: '=',

        },
        link: function(scope, elem, attrs) {
                if (scope.currentUser._id === scope.$parent.message.fromUser._id) {
                    elem.addClass('rightMessage');
                } else {
                    elem.addClass('leftMessage');
                }
            }
    }

})
