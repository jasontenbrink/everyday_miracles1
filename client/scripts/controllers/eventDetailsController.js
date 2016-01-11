app.controller('EventDetailsController',['$scope', '$http', "RegisterForClassFactory", "$location", "$localstorage",
  function ($scope, $http, RegisterForClassFactory, $location, $localstorage) {

  $scope.usersEventSchedule = [];
  $scope.eventId = $localstorage.get("eventId");
  $scope.eventScheduleId = $localstorage.get("eventScheduleId");

  //$scope.registerForClassFactory = RegisterForClassFactory;

  //get event info from the registerForClassFactory
  //should be event info corresponding to event clicked on in calendar view
  //$scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

  //console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

  // set values in local storage
  //$localstorage.set('eventId', $scope.eventFromFactory.eventId);
  //$localstorage.set('eventScheduleId', $scope.eventFromFactory.eventScheduleId);
  $localstorage.set('eventInsertBoolean', false);

  $scope.getEventDetails = function(){
    console.log("in getEventDetails");
    //set params for get call to database
    var eventIds = {
      eventId: $scope.eventId,
      eventScheduleId: $scope.eventScheduleId
    };
    //get call to database to get event info
    //use eventId in event object as the parameter
    $http.get('/event/byEventIdEventScheduleId', {params: eventIds}).then(function(response){
      console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
      $scope.event = response.data[0];
      console.log("$scope.event ",$scope.event);
    });
  };

  $scope.registerForClass = function(){
    $location.path('/chooseclassdates');
  };
  $scope.seeAttendance = function(){
    // attendance uses values from localstorage set above
    $location.path('/attendance');
  };
  $scope.cancelClass = function() {

    var answer = confirm("Are you sure you want to cancel class " + $scope.event.title + " " +
        moment($scope.event.schedule_date).format("MM-DD-YYYY") + " " + moment($scope.event.start_datetime).format("h:mm a") +
        " - " + moment($scope.event.end_datetime).format("h:mm a") + "?");
    if (answer){
      //notify students
      // get student list for the class
      var eventSchedule = {eventScheduleId: $scope.eventScheduleId};
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

        console.log("phone array ", phoneNumberArray);
        console.log("email array ", emailArray);

        var subject = "Everyday Miracles Class Cancellation Notice";
        var message = "Everyday Miracles Class " + $scope.event.title + " " +
          moment($scope.event.schedule_date).format("MM-DD-YYYY") + " " + moment($scope.event.start_datetime).format("h:mm a") +
            " - " + moment($scope.event.end_datetime).format("h:mm a") + " has been cancelled.";
        console.log("message ", message);
        if (phoneNumberArray.length > 0) {
          var textMessage = {
            "phoneNumber[]": phoneNumberArray,
            message: message.substring(0, 159)
          };

          console.log(textMessage);
          $http.get('/notifications/text', {params: textMessage}).then(function (response) {
            console.log("output from /notifications/text ", response.data);
          });
        }

        if (emailArray.length > 0) {
          var emailMessage = {
            "sendTo[]": emailArray,
            subject: subject,
            message: message
          };

          console.log(emailMessage);
          $http.get('/notifications/email', {params: emailMessage}).then(function (response) {
            console.log("output from /notifications/email ", response.data);
          });
        }
        $http.delete('/usersEventSchedule/deleteByEventScheduleId'+ $scope.eventScheduleId).then(function(response){
          console.log("output from delete users eventSchedule by Event Schedule Id ", response.data);
          //delete the class
          if (response.data==true){
            $http.delete('/eventSchedule/delete'+ $scope.eventScheduleId).then(function(response){
              console.log("output from delete eventSchedule ", response.data);
              if (response.data==true){
                //return to calendar
                $location.path('/uicalendar');
              }
            });
          }
        });
      });

      //delete the users from the class then delete the class


    }
    else {
      // do nothing
    }

  };
  $scope.editClass = function() {
    // add event uses values from localstorage set above
    $location.path('/addevent');
  };
  $scope.goBack = function(){
    $location.path('/uicalendar');
  };
  $scope.loginUser = function(){
    $location.path('/login');
  };

  $scope.getEventDetails();


}]);
