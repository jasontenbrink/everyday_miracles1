

app.controller('ConfirmClassSignupController',['$scope', '$http', "RegisterForClassFactory", '$location', function ($scope, $http, RegisterForClassFactory, $location) {

  console.log('hi, from confirm class signup Controller');
  $scope.user = {};
  $scope.event = {};
  $scope.registeredEvents = [];
  $scope.registerForClassFactory = RegisterForClassFactory;

  $scope.user.name = "Jane Doe";
  $scope.user.userId = 1;

  $scope.studentEvents = $scope.registerForClassFactory.getStudentEvents();
  console.log("$scope.eventFromFactory: ",$scope.studentEvents);
  $scope.event = $scope.registerForClassFactory.getEvent();


  $scope.getRegisteredClasses = function(event, someuser) {

    var eventSchedule = {
      userId: someuser.userId,
      eventId: event.eventId
    };

    console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
      $scope.registeredEvents = response.data;
    });
  };

  $scope.confirmClass = function(userEvents, comments, registeredClasses) {

    console.log("this is the class registered for: ", userEvents);
    console.log("these are the comments: ", comments);
    console.log("these are the registeredClasses: ", registeredClasses);

    for (var j = 0; j < registeredClasses.length; j++) {
      for (var i = 0; i < userEvents.length; i++) {
        userEvents[i].comments = comments;


        if (registeredClasses[j].event_schedule_id == userEvents[i].event_schedule_id) {
          userEvents[i].registered = true;
        }

      }
    }

    console.log("the userEvents: ", userEvents);

    for (i = 0; i < userEvents.length; i++) {
      if (userEvents[i].registered == true) {
        console.log("the event has been registered");
      } else {
        var userEvent = {
          userId: 1,
          eventScheduleId: userEvents[i].event_schedule_id,
          status: "Registered",
          comments: userEvents[i].comments
        };
        console.log("Event to post to the database: ", userEvent);
        $http.post('/usersEventSchedule', userEvent).then(function (response) {
          console.log("Output from post /usersEventSchedule ", response.data);
        });
      }
    }

    $location.path('/studentclasslist');
  };

  $scope.goBack = function() {
    $location.path('/chooseclassdates');
    console.log("I hit the go back button: ");
  };

  $scope.getRegisteredClasses($scope.event, $scope.user);

}]);
