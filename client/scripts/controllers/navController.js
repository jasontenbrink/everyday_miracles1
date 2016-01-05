app.controller('NavController',['$scope', 'ActiveProfileFactory', '$location',
  function ($scope, ActiveProfileFactory, $location) {

  var activeProfileFactory = ActiveProfileFactory;

  $scope.goToProfile = function () {
    activeProfileFactory.setLoggedInUserToActiveProfile();
    $location.path('/profile');
  };
}]);
