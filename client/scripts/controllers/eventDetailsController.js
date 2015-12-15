app.controller('EventDetailsController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from event details controller Controller');
  $scope.x = 'angular';
  $scope.y = 'bye';
  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

}]);
