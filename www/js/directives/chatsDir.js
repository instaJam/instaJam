angular.module('instajam').directive('chatsDir', function() {

    return {
        restrict: 'E',
        template:   '<img ng-if="currentUser._id !== chat.toUser._id" ng-src="{{chat.toUser.profpic}}">' +
                    '<h2 ng-if="currentUser._id !== chat.toUser._id">{{chat.toUser.username}}</h2>' +
                    '<img ng-if="currentUser._id === chat.toUser._id" ng-src="{{chat.fromUser.profpic}}">' +
                    '<h2 ng-if="currentUser._id === chat.toUser._id">{{chat.fromUser.username}}</h2>'
    }

})
