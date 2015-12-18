app.controller('EventDetailsController',['$scope', '$http', "RegisterForClassFactory", "$location",
  function ($scope, $http, RegisterForClassFactory, $location) {

  console.log('hi, from event details controller');
  $scope.user = {};

  $scope.user.loginstatus = true;

  $scope.user.role = "admin";

  $scope.registerForClassFactory = RegisterForClassFactory;

  //get event info from the registerForClassFactory
  //should be event info corresponding to event clicked on in calendar view
  $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

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
    console.log("attendance button clicked");
    $location.path('/attendance');
  };
  $scope.cancelClass = function(someevent) {
    console.log("cancel class button clicked");
    //$window.alert message

  };
  $scope.editClass = function(someevent) {
    console.log("edit class button clicked");
    //$location.path('/addclass);
  };
  $scope.goBack = function(){
    $location.path('/uicalendar');
  };

  $scope.getEventDetails($scope.eventFromFactory);
  //sample data in eventDate
  //can change it to be something else
  //$scope.event = {
  //  start:"2015-12-05T14:00:00Z",
  //  end:"2015-12-05T15:00:00Z",
  //  title: "Mom-to-Mom Group",
  //  description: "Need a moment to stop, connect, and breathe? Free and on-going for expecting, new, and experienced mothers. This group, put on by The Nursing Nook, offers gentle yoga and meditation, mother-to-mother support, local breastfeeding resources, playdate for breastfeeding babes, monthly guest speakers. Childcare for older siblings may be available. Please pre-register."
  //};

  //need the click stuff

  //get the event stuff from the server


  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

}]);
