app.controller('ChooseClassDatesController',['$scope', '$http', "$localstorage", '$location', "ActiveProfileFactory",
  "RegisterForClassFactory",
  function ($scope, $http, $localstorage, $location, ActiveProfileFactory, RegisterForClassFactory) {
  console.log('hi, from choose class dates Controller');


  $scope.today = new Date();
  //test user info
  //$scope.user = {};
  //$scope.user.userId = 1;


  var user = ActiveProfileFactory.getLoggedInUser();
  if (user.userId) {
    $localstorage.set("userId", user.userId);
  }
  console.log("the user from ActiveProfile: ",user);
  $scope.userId = $localstorage.get("userId");

  $scope.event = [];
  $scope.registeredEvents = [];
  $scope.studentEvents = [];
  $scope.allUserEvents = [];

  $scope.eventId = $localstorage.get("eventId");
  $scope.eventScheduleId = $localstorage.get("eventScheduleId");

  //get factory
  $scope.registerForClassFactory = RegisterForClassFactory;

  //get eventId from factory
  //$scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  //get classes user has already registered for
  $scope.getRegisteredClasses = function() {

    var eventSchedule = {
      userId: $scope.userId,
      eventId: $scope.eventId
    };

    //console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
      $scope.registeredEvents = response.data;
      $scope.checkRegisteredClasses();
    });
  };

  //get all class instances for this particular class
  $scope.loadEventData =  function() {

    var eventId = {
      eventId: $scope.eventId
    };
    console.log("Input to get /eventSchedule/byEventId ", eventId);

    $http.get('/eventSchedule/byEventId', {params: eventId})
        .then(function(response){
            console.log("Output from get /eventSchedule/byEventId ", response.data);
            $scope.event = response.data;
            $scope.getRegisteredClasses($scope.user);
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
        if ($scope.event[j].event_schedule_id == $scope.eventScheduleId) {
          console.log("making sure the event clicked on is checked");
          $scope.event[j].addCheckbox = true;
        }
      }
    }
    console.log("$scope.event after for loops :",$scope.event);
  };

  $scope.loadEventData();


  $scope.signUp = function() {

    for (var i = 0; i < $scope.event.length; i++) {
      if ($scope.event[i].addCheckbox == true) {
        $scope.studentEvents.push($scope.event[i]);

      }
    }
    console.log("studentEvents loop ", $scope.studentEvents);
    $scope.registerForClassFactory.setStudentEvents({});
    $scope.registerForClassFactory.setStudentEvents($scope.studentEvents);
    console.log("registerForClassFactory ", $scope.registerForClassFactory.getStudentEvents());

    $location.path('/confirmclasssignup');
  };

  $scope.goBack = function () {
    $location.path('/eventdetails');
    //console.log("I hit the go back button: ");
  };
}]);
