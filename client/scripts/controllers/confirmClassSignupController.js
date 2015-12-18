

app.controller('ConfirmClassSignupController',['$scope', '$http', "RegisterForClassFactory", '$location', function ($scope, $http, RegisterForClassFactory, $location) {

  console.log('hi, from confirm class signup Controller');
  $scope.user = {};
  $scope.event = {};

  $scope.registerForClassFactory = RegisterForClassFactory;

  $scope.user.name = "Jane Doe";

  $scope.studentEvents = $scope.registerForClassFactory.getStudentEvents();
  console.log("$scope.eventFromFactory: ",$scope.studentEvents);
  $scope.event = $scope.registerForClassFactory.getEvent();

  $scope.confirmClass = function(userEvents, comments) {
    console.log("this is the class registered for: ", userEvents);
    console.log("these are the comments: ", comments);
    for(var i = 0; i < userEvents.length; i++){
      userEvents[i].comments = comments;

      var userEvent = {
        userId: 1,
        eventScheduleId: userEvents[i].event_schedule_id,
        status: "Registered",
        comments: userEvents[i].comments
      };

      console.log("Input to post /usersEventSchedule ", userEvent);
      $http.post('/usersEventSchedule', userEvent).then(function (response) {
        console.log("Output from post /usersEventSchedule ", response.data);
      });
    }

  };

  $scope.goBack = function() {
    $location.path('/chooseclassdates');
    console.log("I hit the go back button: ");
  };

  $scope.insertUsersEventSchedule = function() {
    //var userEvent = {
    //  userId: 1,
    //  eventScheduleId: 2,
    //  status: 'registered',
    //  comments: 'this is a comment'
    //};


  };
}]);
