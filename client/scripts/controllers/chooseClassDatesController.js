app.controller('ChooseClassDatesController',['$scope', '$http', "RegisterForClassFactory", '$location', function ($scope, $http, RegisterForClassFactory, $location) {
  console.log('hi, from choose class dates Controller');

  //$scope.user = {};
  //$scope.user.name = "Jane Doe";
  $scope.event = [];

  $scope.registerForClassFactory = RegisterForClassFactory;

  $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  console.log("scope.eventFromFactory: ",$scope.registerForClassFactory.getEvent());
  console.log("this is the class registered for: ", $scope.eventFromFactory.eventId, $scope.eventFromFactory.title);

  $scope.loadEventData =  function(event) {
    var eventId = {
      eventId: event.eventId
    };
    console.log("Input to get /eventSchedule/byEventId ", eventId);

    $http.get('/eventSchedule/byEventId', {params: eventId}).then(function(response){
      console.log("Output from get /eventSchedule/byEventId ", response.data);
      $scope.event = response.data;
      console.log("$scope.event ",$scope.event);
    });
  };

  $scope.loadEventData($scope.eventFromFactory);


  $scope.signUp = function(event) {
    console.log("Were here ok ", event);
    for (var i = 0; i < event.length; i++) {
      if (event[i].addCheckbox){
        var studentEvents = [];
        push(studentEvents).$scope.registerForClassFactory.setStudentEventDates();
      }
    }

    //$location.path('/confirmclasssignup');
    //console.log("these are the dates signed up for: ", $scope.event);
    //$scope.insertUsersEventSchedule(userEvent);
  };

  $scope.goBack = function() {
    $location.path('/eventdetails');
    console.log("I hit the go back button: ");
  };

}]);
