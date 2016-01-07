app.controller('LoginController',['$scope', '$http', '$location', 'ActiveProfileFactory', "$localstorage", '$window',
  function ($scope, $http, $location, ActiveProfileFactory, $localstorage, $window) {

  var activeProfileFactory = ActiveProfileFactory;
  console.log('hi, from Login Controller');

  $scope.user = {};
  $scope.submitCredentials = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/login', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        //console.log('response status', response.status);
        if (response.status===200){
          activeProfileFactory.setLoggedInUser(response.data.userId);

          var user = ActiveProfileFactory.getLoggedInUser();
          console.log("the user from ActiveProfile: ",user);
          if (user.userId) {
            $localstorage.set("userId", user.userId);
          }
          $scope.userId = $localstorage.get("userId");
          console.log("the user: ", $scope.userId);
          $window.location.reload();
          $location.path('/uicalendar');
        }
        else{
          // $location.path('/failure');
          alert('sign in failed');
        }

      });
  };

}]);
