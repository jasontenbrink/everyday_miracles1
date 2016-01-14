app.controller('NavController',['$scope', 'ActiveProfileFactory', '$location', '$localstorage', '$http','$window',
  function ($scope, ActiveProfileFactory, $location, $localstorage, $http, $window) {

  var activeProfileFactory = ActiveProfileFactory;

  $scope.goToProfile = function () {
    activeProfileFactory.setLoggedInUserToActiveProfile();
    var userId = $localstorage.get("userId");
    $localstorage.set("searchUserId", userId);
    $location.path('/profile');
  };

  $scope.go = function (path) {
    $location.path(path);
  }; 
  $scope.logout = function () {
    $http.get('/logout')
    .then(function (response) {
      $window.location.reload();
      $location.path('/uicalendar');
    });
  };
  $scope.goToAddEvent = function(){
    $localstorage.set('eventInsertBoolean', true);
    $location.path('/addevent');
  };
}]);
