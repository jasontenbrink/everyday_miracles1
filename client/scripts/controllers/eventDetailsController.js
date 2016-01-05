app.controller('EventDetailsController',['$scope', '$http', "RegisterForClassFactory", "$location", "$localstorage",
  function ($scope, $http, RegisterForClassFactory, $location, $localstorage) {

  $scope.usersEventSchedule = [];

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

    var answer = confirm("Are you sure you want to cancel class " + $scope.event.title + " " +
        $scope.event.schedule_date + " " + $scope.event.start_datetime + " - " + $scope.event.end_datetime + "?");
    if (answer){
      //notify students
      // get student list for the class
      var eventSchedule = {eventScheduleId: $scope.eventFromFactory.eventScheduleId};
      console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
      $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        //console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
        $scope.usersEventSchedule = response.data;
        console.log("userseventschedule ", $scope.usersEventSchedule);

        var phoneNumberArray = [];
        var emailArray = [];

        // loop through the students and populate email or phone number array
        for (var i = 0; i < $scope.usersEventSchedule.length; i++) {
          var obj = $scope.usersEventSchedule[i];
          if (obj.contact_type=="email" && obj.email_address != null){
            emailArray.push(obj.email_address);
          }else if (obj.contact_type=="text" && obj.phone_number != null){
            phoneNumberArray.push(obj.phone_number);
          }
        }

      });


      //delete the class

      //return to calendar
      //$location.path('/uicalendar');
    }
    else {
      // do nothing
    }

  };
  $scope.editClass = function(someevent) {
    // add event uses values from localstorage set above
    $location.path('/addevent');
  };
  $scope.goBack = function(){
    $location.path('/uicalendar');
  };
  $scope.loginUser = function(){
    $location.path('/login');
  };

  $scope.getEventDetails($scope.eventFromFactory);


}]);
