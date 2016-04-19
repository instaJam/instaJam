angular.module('instajam').directive('messageProfPic', function() {


    return {
        restrict: 'E',
        scope: {
            currentUser: '=',
            chat: '='
        },
        template:   '<img ng-if="currentUser._id !== chat.toUser._id" ng-src="{{chat.toUser.profpic}}" style="width: 64px; height: 64px">' +
                    '<p ng-if="currentUser._id !== chat.toUser._id"> {{chat.toUser.username}}</p>' +
                    '<img ng-if="currentUser._id === chat.toUser._id" ng-src="{{chat.fromUser.profpic}}" style="width: 64px; height: 64px">' +
                    '<p ng-if="currentUser._id === chat.toUser._id"> {{chat.fromUser.username}}</p>'
    }

})
