angular.module('instajam').directive('profPic', function (imagesService, userService) {

  return {
    restrict: 'A',
    scope: {
        profile: '='
    },
    link: function (scope, elem, attrs) {
      elem.bind("change", function (changeEvent) {
        var reader = new FileReader();

        reader.onloadend = function (loadEvent) {
          var fileread = loadEvent.target.result;
          var tempArray = elem[0].value.split('\\');
          var fileName = tempArray[tempArray.length - 1];
          imagesService.storeImage(fileread, fileName, scope.profile.email)
          .then(function (result) {
                  scope.profile.profpic = result.data.Location;
                  userService.editUser(scope.profile);

          })
          .catch(function (err) {
            console.error(err);
          });
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
  })
