app.controller('ConfirmClassSignupController',['$scope', '$http', '$location', function ($scope, $http, $location) {
  console.log('hi, from confirm class signup Controller');
  $scope.user = {};
  $scope.event = {};

  $scope.user.name = "Jane Doe";


  $scope.event.title = "Mom-to-Mom Group";
  $scope.event.dates = ["Tues Nov 5, 2015", "Thurs Dec 20, 2015", "Fri Dec 25, 2015"];

  $scope.confirmClass = function(userEvent) {
    console.log("this is the class registered for: ", userEvent);
    $scope.insertUsersEventSchedule(userEvent);

  };

  $scope.goBack = function() {
    $location.path('/chooseclassdates');
    console.log("I hit the go back button: ");
  };

  $scope.insertUsersEventSchedule = function(userEvent) {
    //var userEvent = {
    //  userId: 1,
    //  eventScheduleId: 2,
    //  status: 'registered',
    //  comments: 'this is a comment'
    //};

    console.log("Input to post /usersEventSchedule ", userEvent);
    $http.post('/usersEventSchedule', userEvent).then(function (response) {
      console.log("Output from post /usersEventSchedule ", response.data);
    });
  };
}]);
