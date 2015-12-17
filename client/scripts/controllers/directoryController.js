app.controller('DirectoryController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from Directory Controller');
  $scope.x = 'angular';
  $scope.y = 'bye';
  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

}]);
