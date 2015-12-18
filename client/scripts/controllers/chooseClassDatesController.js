app.controller('ChooseClassDatesController',['$scope', '$http', "RegisterForClassFactory", '$location', function ($scope, $http, RegisterForClassFactory, $location) {
  console.log('hi, from choose class dates Controller');

  $scope.user = {};

  //test user info
  $scope.user.userId = 1;

  $scope.event = [];
  $scope.studentEvents = [];
  $scope.allUserEvents = [];

  $scope.registerForClassFactory = RegisterForClassFactory;

  $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  //console.log("scope.eventFromFactory: ",$scope.registerForClassFactory.getEvent());
  //console.log("this is the class registered for: ", $scope.eventFromFactory.eventId, $scope.eventFromFactory.title);
  $scope.getRegisteredClasses = function(event) {
    var eventSchedule = {eventScheduleId: event.eventScheduleId};
    console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
      console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
      //$scope.allUserEvents = response.data;
      //for (var i = 0; i < $scope.allUserEvents.length; i++) {
      //  if ($scope.allClasses[i].status == "Registered") {
      //
      //  }
      //}
    });
  };
  $scope.loadEventData =  function(event) {
    var eventId = {
      eventId: event.eventId
    };
    console.log("Input to get /eventSchedule/byEventId ", eventId);

    $http.get('/eventSchedule/byEventId', {params: eventId}).then(function(response){
      console.log("Output from get /eventSchedule/byEventId ", response.data);
      $scope.event = response.data;
    });
  };
  $scope.getRegisteredClasses($scope.eventFromFactory);
  $scope.loadEventData($scope.eventFromFactory);


  $scope.signUp = function(event) {
    //console.log("Were here ok ", event);

    for (var i = 0; i < event.length; i++) {
      if (event[i].addCheckbox == true) {
        $scope.studentEvents.push($scope.event[i]);

        //console.log("this is events with addCheckbox", $scope.event[i]);
      }
    }
    //console.log("this is studentEvents ", $scope.studentEvents);
    $scope.registerForClassFactory.setStudentEvents($scope.studentEvents);
    //console.log("factory test: ", $scope.registerForClassFactory.getStudentEvents());

    $location.path('/confirmclasssignup');
  };

  $scope.goBack = function () {
    $location.path('/eventdetails');
    //console.log("I hit the go back button: ");
  };
}]);
