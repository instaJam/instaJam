angular.module('instajam').directive('messageProfPic', function() {


    return {
        restrict: 'E',
        scope: {
            currentUser: '=',
            chat: '='
        },
        template:   '<img ng-if="currentUser._id !== chat.toUser._id" style="background: url({{chat.toUser.profpic}}) no-repeat; background-size: cover; background-position: center; width: 64px; height: 64px">' +
                    '<p ng-if="currentUser._id !== chat.toUser._id"> {{chat.toUser.username}}</p>' +
                    '<img ng-if="currentUser._id === chat.toUser._id" style="background: url({{chat.toUser.profpic}}) no-repeat; background-size: cover; background-position: center; width: 64px; height: 64px">' +
                    '<p ng-if="currentUser._id === chat.toUser._id"> {{chat.fromUser.username}}</p>'
    }

})
