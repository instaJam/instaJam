angular.module( "instajam" ).directive( "nearMe", function () {
  return {
    templateUrl: '../templates/nearMe.html',
    controller: 'frFeedCtrl',
    restrict: 'E'
  }
  } );
