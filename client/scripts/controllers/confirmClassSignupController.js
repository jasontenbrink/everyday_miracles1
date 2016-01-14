app.controller('ConfirmClassSignupController',['$scope', '$http', "RegisterForClassFactory", '$location', "$localstorage",
  function ($scope, $http, RegisterForClassFactory, $location, $localstorage) {

  $scope.userId = $localstorage.get("userId");
  $localstorage.set("searchUserId", $scope.userId);
  $scope.eventId = $localstorage.get("eventId");
  //$scope.user = {};
  $scope.event = {};
  $scope.registeredEvents = [];
  $scope.registerForClassFactory = RegisterForClassFactory;

  //$scope.user.name = "Jane Doe";
  //$scope.user.userId = 1;

  $scope.studentEvents = $scope.registerForClassFactory.getStudentEvents();

    var event3 = {eventId: $scope.eventId};

    $http.get('/event/byEventId', {params: event3}).then(function(response){
      $scope.title = response.data[0].title;
    });

  $scope.getRegisteredClasses = function() {

    var eventSchedule = {
      userId: $scope.userId,
      eventId: $scope.eventId
    };

    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      $scope.registeredEvents = response.data;

    });
  };

  $scope.confirmClass = function(userEvents, comments, registeredClasses) {
    for (var j = 0; j < registeredClasses.length; j++) {
      for (var i = 0; i < userEvents.length; i++) {
        userEvents[i].comments = comments;


        if (registeredClasses[j].event_schedule_id == userEvents[i].event_schedule_id) {
          userEvents[i].registered = true;
        }

      }
    }

    for (i = 0; i < userEvents.length; i++) {
      if (userEvents[i].registered == true) {
      } else {
        var userEvent = {
          userId: $scope.userId,
          eventScheduleId: userEvents[i].event_schedule_id,
          status: "Registered",
          comments: userEvents[i].comments
        };
        $http.post('/usersEventSchedule', userEvent).then(function (response) {
          //send text or email here
          //get users contact info
          var user1 = {
            userId: $scope.userId
          };
          $http.get('/users/byUserId', {params: user1}).then(function (response) {
            var obj = response.data[0];
            //construct message
            var subject = "Everyday Miracles Class Registration Confirmation";
            var message = "You have successfully registered for Everyday Miracles Class " + $scope.title + " " +
                moment(userEvents[0].schedule_date).format("MM-DD-YYYY") + " " + moment(userEvents[0].start_datetime).format("h:mm a") +
                " - " + moment(userEvents[0].end_datetime).format("h:mm a") + ".";
            //check type of contact method and send message
            if (obj.contact_type=="email" && obj.email_address != null){
              var emailMessage = {
                "sendTo[]": [obj.email_address],
                subject: subject,
                message: message
              };
              $http.get('/notifications/email', {params: emailMessage}).then(function (response) {
              });

              //emailArray.push(obj.email_address);
            }else if (obj.contact_type=="text" && obj.phone_number != null){
              var textMessage = {
                "phoneNumber[]": [obj.phone_number],
                message: message.substring(0, 159)
              };

              $http.get('/notifications/text', {params: textMessage}).then(function (response) {
              });
              //phoneNumberArray.push(obj.phone_number);
            }


          });


        });
      }
    }

    $location.path('/studentclasslist');
  };

  $scope.goBack = function() {
    $location.path('/chooseclassdates');
  };

  $scope.getRegisteredClasses();

}]);
