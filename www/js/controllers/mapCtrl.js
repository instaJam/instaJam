angular.module('instajam').controller('mapCtrl', function($scope,$state,$auth, userService, $ionicModal){

  userService.getCurrentUser().then(function(res){
    console.log(res.data)
              $scope.currentUser = res.data;
              var cities = [
                  {
                      city : 'DevMountain',
                      desc : 'Current Location',
                      lat : $scope.currentUser.loc.lat,
                      long : $scope.currentUser.loc.long,
                      hours : '8AM-11PM',
                  }
                ];


                  var mapOptions = {
                      zoom: 13,
                      center: new google.maps.LatLng($scope.currentUser.loc.lat, $scope.currentUser.loc.long),
                      mapTypeId: google.maps.MapTypeId.MAP
                  }

                  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                  $scope.markers = [];

                  var infoWindow = new google.maps.InfoWindow();

                  var createMarker = function (info){

                      var marker = new google.maps.Marker({
                          map: $scope.map,
                          position: new google.maps.LatLng(info.lat, info.long),
                          title: info.city,
                          description: info.desc,
                      });
                      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

                      google.maps.event.addListener(marker, 'click', function(){
                          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content + info.hours);
                          infoWindow.open($scope.map, marker);
                      });

                      $scope.markers.push(marker);

                  }

                  for (i = 0; i < cities.length; i++){
                      createMarker(cities[i]);
                  }

                  $scope.openInfoWindow = function(e, selectedMarker){
                      e.preventDefault();
                      google.maps.event.trigger(selectedMarker, 'click');
                      $scope.picSelector = selectedMarker.pics;
                        }
          })
  // 
  // var cities = [
  //     {
  //         city : 'DevMountain',
  //         desc : 'Current Location',
  //         lat : 40.225971,
  //         long : -111.6603612,
  //         hours : '8AM-11PM',
  //     }
  //   ];
      //
      //
      // var mapOptions = {
      //     zoom: 11,
      //     center: new google.maps.LatLng($scope.currentUser.loc.lat, $scope.currentUser.loc.long),
      //     mapTypeId: google.maps.MapTypeId.MAP
      // }
      //
      // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      //
      // $scope.markers = [];
      //
      // var infoWindow = new google.maps.InfoWindow();
      //
      // var createMarker = function (info){
      //
      //     var marker = new google.maps.Marker({
      //         map: $scope.map,
      //         position: new google.maps.LatLng(info.lat, info.long),
      //         title: info.city,
      //         description: info.desc,
      //     });
      //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
      //
      //     google.maps.event.addListener(marker, 'click', function(){
      //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content + info.hours);
      //         infoWindow.open($scope.map, marker);
      //     });
      //
      //     $scope.markers.push(marker);
      //
      // }
      //
      // for (i = 0; i < cities.length; i++){
      //     createMarker(cities[i]);
      // }
      //
      // $scope.openInfoWindow = function(e, selectedMarker){
      //     e.preventDefault();
      //     google.maps.event.trigger(selectedMarker, 'click');
      //     $scope.picSelector = selectedMarker.pics;
      //       }

  })
