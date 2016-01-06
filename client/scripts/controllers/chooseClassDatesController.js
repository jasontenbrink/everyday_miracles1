app.controller('ChooseClassDatesController',['$scope', '$http', "RegisterForClassFactory", '$location', "ActiveProfileFactory",
  function ($scope, $http, RegisterForClassFactory, $location, ActiveProfileFactory) {
  console.log('hi, from choose class dates Controller');


  $scope.today = new Date();
  //test user info
  //$scope.user = {};
  //$scope.user.userId = 1;
  var activeProfileFactory = ActiveProfileFactory;


  var user = activeProfileFactory.getLoggedInUser();
  console.log("the user from ActiveProfile: ",user);
  $scope.user = activeProfileFactory.getLoggedInUser();

  $scope.event = [];
  $scope.registeredEvents = [];
  $scope.studentEvents = [];
  $scope.allUserEvents = [];

  //get factory
  $scope.registerForClassFactory = RegisterForClassFactory;

  //get eventId from factory
  $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  //get classes user has already registered for
  $scope.getRegisteredClasses = function(event, someuser) {

    var eventSchedule = {
      userId: someuser.userId,
      eventId: event.eventId
    };

    //console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
      $scope.registeredEvents = response.data;
      $scope.checkRegisteredClasses();
    });
  };

  //get all class instances for this particular class
  $scope.loadEventData =  function(event) {
    console.log("the event from factory: ", event);
    var eventId = {
      eventId: event.eventId
    };
    console.log("Input to get /eventSchedule/byEventId ", eventId);

    $http.get('/eventSchedule/byEventId', {params: eventId})
        .then(function(response){
            console.log("Output from get /eventSchedule/byEventId ", response.data);
            $scope.event = response.data;
            $scope.getRegisteredClasses(event, $scope.user)
        });
  };

  //merge the registered classes with the event data
  $scope.checkRegisteredClasses = function() {
    console.log("checkRegisteredClasses fired");
    for (var i = 0; i < $scope.registeredEvents.length; i++) {
      for (var j = 0; j < $scope.event.length; j++) {
        if ($scope.registeredEvents[i].event_schedule_id == $scope.event[j].event_schedule_id) {
            $scope.event[j].addCheckbox = true;
            //console.log("true");
        }
        if ($scope.event[j].event_schedule_id == $scope.eventFromFactory.eventScheduleId) {
          console.log("making sure the event clicked on is checked");
          $scope.event[j].addCheckbox = true;
        }
      }
    }
    console.log("$scope.event after for loops :",$scope.event);
  };

  $scope.loadEventData($scope.eventFromFactory);


  $scope.signUp = function(event) {

    for (var i = 0; i < event.length; i++) {
      if (event[i].addCheckbox == true) {
        $scope.studentEvents.push($scope.event[i]);

      }
    }
    $scope.registerForClassFactory.setStudentEvents($scope.studentEvents);

    $location.path('/confirmclasssignup');
  };

  $scope.goBack = function () {
    $location.path('/eventdetails');
    //console.log("I hit the go back button: ");
  };
}]);
