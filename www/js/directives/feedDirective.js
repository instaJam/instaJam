angular.module('instajam').directive('feedPost', function (imagesService, postService) {

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
                  var content = result.data.Location;
                  postService.postContent(content, scope.profile._id);

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
