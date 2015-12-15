app.controller('CalendarController',['$scope', function ($scope) {
  console.log('hi, from calendarController');
  $scope.x = 'hi';
  $scope.y = 'bye';
  $scope.gridOptions={};
  $scope.gridOptions.data = [
    {"firstName": "Jason", "lastName": "Tenbrink"},
    {"firstName": "Paul", "lastName": "Zimmel"}
  ];
}]);

