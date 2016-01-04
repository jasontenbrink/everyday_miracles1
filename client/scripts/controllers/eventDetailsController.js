app.controller('EventDetailsController',['$scope', '$http', "RegisterForClassFactory", "$location", "$localstorage",
  function ($scope, $http, RegisterForClassFactory, $location, $localstorage) {

  console.log('hi, from event details controller');
  $scope.user = {};

  $scope.user.loginstatus = true;

  $scope.user.role = "admin";

  $scope.registerForClassFactory = RegisterForClassFactory;

  //get event info from the registerForClassFactory
  //should be event info corresponding to event clicked on in calendar view
  $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

  // set values in local storage
  $localstorage.set('eventId', $scope.eventFromFactory.eventId);
  $localstorage.set('eventScheduleId', $scope.eventFromFactory.eventScheduleId);
  $localstorage.set('eventInsertBoolean', false);

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

  $scope.registerForClass = function(someevent){
    $location.path('/chooseclassdates');
  };
  $scope.seeAttendance = function(someevent){
    // attendance uses values from localstorage set above
    $location.path('/attendance');
  };
  $scope.cancelClass = function(someevent) {
    console.log("cancel class button clicked");
    //$window.alert message

  };
  $scope.editClass = function(someevent) {
    // add event uses values from localstorage set above
    $location.path('/addevent');
  };
  $scope.goBack = function(){
    $location.path('/uicalendar');
  };

  $scope.getEventDetails($scope.eventFromFactory);


}]);
