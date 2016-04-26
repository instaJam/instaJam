angular.module( "instajam" ).directive( "followingDir", function () {
  return {
    templateUrl: '../templates/following.html',
    controller: 'frFeedCtrl',
    restrict: 'E'
  }
  } );
