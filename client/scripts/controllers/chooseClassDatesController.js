app.controller('ChooseClassDatesController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from choose class dates Controller');

  //$scope.user = {};
  //$scope.user.name = "Jane Doe";
  //
  //$scope.title = "Mom-to-Mom Group";
  //console.log("this is the class registered for: ", title);
  //$scope.event.schedule_date = ["Tues Nov 5, 2015", "Thurs Dec 20, 2015", "Fri Dec 25, 2015"];


  $scope.loadData = function() {
    var event = {eventId: 1};

    console.log("Input to get /eventSchedule/byEventId ", event);
    $http.get('/eventSchedule/byEventId', {params: event}).then(function(response){
      console.log("Output from get /eventSchedule/byEventId ", response.data);
      $scope.event = response.data;
    });
  };

  $scope.loadData();



  $scope.signUp = function() {
    console.log("these are the dates signed up for: ");
    //$scope.insertUsersEventSchedule(userEvent);
  };

  $scope.goBack = function() {
    console.log("I hit the go back button: ");
  };

}]);
