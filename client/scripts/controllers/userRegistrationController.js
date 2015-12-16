app.controller('UserRegistrationController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from jade Controller');
  $scope.x = 'angular';
  $scope.y = 'bye';
  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

}]);
