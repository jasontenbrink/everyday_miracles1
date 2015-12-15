app.controller('ConfirmClassSignupController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from confirm class signup Controller');
  $scope.user = {};
  $scope.event = {};

  $scope.user.name = "Jane Doe";


  $scope.event.title = "Mom-to-Mom Group";
  $scope.event.dates = [];

}]);
