app.controller('ChooseClassDatesController',['$scope', '$http', "RegisterForClassFactory", '$location', function ($scope, $http, RegisterForClassFactory, $location) {
  console.log('hi, from choose class dates Controller');

  //$scope.user = {};
  //$scope.user.name = "Jane Doe";

  console.log("this is the class registered for: ", event.event_id, event.title);

  $scope.registerForClassFactory = RegisterForClassFactory;

  $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

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



  $scope.signUp = function() {
    $location.path('/confirmclasssignup');
    console.log("these are the dates signed up for: ", $scope.event);
    //$scope.insertUsersEventSchedule(userEvent);
  };

  $scope.goBack = function() {
    $location.path('/eventdetails');
    console.log("I hit the go back button: ");
  };

}]);
