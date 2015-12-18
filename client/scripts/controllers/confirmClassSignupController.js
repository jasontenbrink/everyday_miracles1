

app.controller('ConfirmClassSignupController',['$scope', '$http', "RegisterForClassFactory", '$location', function ($scope, $http, RegisterForClassFactory, $location) {

  console.log('hi, from confirm class signup Controller');
  $scope.user = {};
  $scope.event = {};

  $scope.registerForClassFactory = RegisterForClassFactory;

  $scope.user.name = "Jane Doe";

  $scope.eventFromFactory = $scope.registerForClassFactory.getStudentEventDates();
  console.log("$scope.eventFromFactory: ",$scope.eventFromFactory);


  $scope.getEventDetails = function(event){
    console.log("in getEventDetails");
    //set params for get call to database
    var eventIds = {
      eventId: event.eventId,
      eventScheduleId: event.eventScheduleId
    };
    //get call to database to get event info
    //use eventId in event object as the parameter
    $http.get('/event/byEventIdEventScheduleId', {params: eventIds}).then(function(response){
      console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
      $scope.event = response.data[0];
      console.log("$scope.event ",$scope.event);
    });
  };

  $scope.confirmClass = function(userEvent) {
    console.log("this is the class registered for: ", userEvent);
    $scope.insertUsersEventSchedule(userEvent);

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

    console.log("Input to post /usersEventSchedule ", userEvent);
    $http.post('/usersEventSchedule', userEvent).then(function (response) {
      console.log("Output from post /usersEventSchedule ", response.data);
    });
  };
}]);
