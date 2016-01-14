app.controller('ChooseClassDatesController',['$scope', '$http', "$localstorage", '$location', "ActiveProfileFactory",
  "RegisterForClassFactory",
  function ($scope, $http, $localstorage, $location, ActiveProfileFactory, RegisterForClassFactory) {

  $scope.today = new Date();
  $scope.title = "";

  $scope.userId = $localstorage.get("userId");

  $scope.event = [];
  $scope.registeredEvents = [];
  $scope.studentEvents = [];
  $scope.allUserEvents = [];

  $scope.eventId = $localstorage.get("eventId");
  $scope.eventScheduleId = $localstorage.get("eventScheduleId");

  //get factory
  $scope.registerForClassFactory = RegisterForClassFactory;

  //get classes user has already registered for
  $scope.getRegisteredClasses = function() {

    var eventSchedule = {
      userId: $scope.userId,
      eventId: $scope.eventId
    };

    //console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      $scope.registeredEvents = response.data;
      $scope.checkRegisteredClasses();
    });
  };

  //get all class instances for this particular class
  $scope.loadEventData =  function() {

    var eventIds = {
      eventId: $scope.eventId,
      eventScheduleId: $scope.eventScheduleId
    };
    //get call to database to get event info
    //use eventId in event object as the parameter
    $http.get('/event/byEventIdEventScheduleId', {params: eventIds}).then(function(response){

      $scope.title = response.data[0].title;

      var eventId = {
        eventId: $scope.eventId,
        fromDate: response.data[0].schedule_date
      };

      $http.get('/eventSchedule/currentByEventId', {params: eventId})
          .then(function(response){
            $scope.event = response.data;
            $scope.getRegisteredClasses($scope.user);
          });
    });
  };

  //merge the registered classes with the event data
  $scope.checkRegisteredClasses = function() {

    for (var i = 0; i < $scope.event.length; i++) {
      if ($scope.event[i].event_schedule_id == $scope.eventScheduleId) {
        $scope.event[i].addCheckbox = true;
      }
      for (var j = 0; j < $scope.registeredEvents.length; j++) {
        if ($scope.registeredEvents[j].event_schedule_id == $scope.event[i].event_schedule_id) {
          $scope.event[i].addCheckbox = true;
          //console.log("true");
        }

      }
    }
  };

  $scope.loadEventData();


  $scope.signUp = function() {

    for (var i = 0; i < $scope.event.length; i++) {
      if ($scope.event[i].addCheckbox == true) {
        $scope.studentEvents.push($scope.event[i]);

      }
    }
    $scope.registerForClassFactory.setStudentEvents({});
    $scope.registerForClassFactory.setStudentEvents($scope.studentEvents);

    $location.path('/confirmclasssignup');
  };

  $scope.goBack = function () {
    $location.path('/eventdetails');
    //console.log("I hit the go back button: ");
  };
}]);
