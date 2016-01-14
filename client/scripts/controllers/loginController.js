app.controller('LoginController',['$scope', '$http', '$location', 'ActiveProfileFactory', "$localstorage", '$window',
  function ($scope, $http, $location, ActiveProfileFactory, $localstorage, $window) {

  var activeProfileFactory = ActiveProfileFactory;

  $scope.user = {};
  $scope.submitCredentials = function () {
    $http.post('/login', $scope.user)
      .then(function (response) {
        if (response === undefined){
          $window.alert('incorrect username or password');
        }
        else if (response.status===200){
          activeProfileFactory.setLoggedInUser(response.data.userId);

          var user = ActiveProfileFactory.getLoggedInUser();
          if (user.userId) {
            $localstorage.set("userId", user.userId);
            $localstorage.set("searchUserId", user.userId);
          }
          $scope.userId = $localstorage.get("userId");
          $window.location.reload();
          $location.path('/uicalendar');
        }
        else{
          // $location.path('/failure');
          alert('sign in failed');
        }

      });
  };

  $scope.go = function (path) {
    $location.path(path);
  };

}]);
