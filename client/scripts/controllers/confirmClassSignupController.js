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
  console.log("$scope.studentEvents: ",$scope.studentEvents);


  $scope.getRegisteredClasses = function() {

    var eventSchedule = {
      userId: $scope.userId,
      eventId: $scope.eventId
    };

    console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
      $scope.registeredEvents = response.data;
    });
  };

  $scope.confirmClass = function(userEvents, comments, registeredClasses) {

    console.log("this is the class registered for: ", userEvents);
    console.log("these are the comments: ", comments);
    console.log("these are the registeredClasses: ", registeredClasses);

    for (var j = 0; j < registeredClasses.length; j++) {
      for (var i = 0; i < userEvents.length; i++) {
        userEvents[i].comments = comments;


        if (registeredClasses[j].event_schedule_id == userEvents[i].event_schedule_id) {
          userEvents[i].registered = true;
        }

      }
    }

    console.log("the userEvents: ", userEvents);

    for (i = 0; i < userEvents.length; i++) {
      if (userEvents[i].registered == true) {
        console.log("the event has been registered");
      } else {
        var userEvent = {
          userId: $scope.userId,
          eventScheduleId: userEvents[i].event_schedule_id,
          status: "Registered",
          comments: userEvents[i].comments
        };
        console.log("Event to post to the database: ", userEvent);
        $http.post('/usersEventSchedule', userEvent).then(function (response) {
          console.log("Output from post /usersEventSchedule ", response.data);
          //send text or email here
          //get users contact info
          var user1 = {
            userId: $scope.userId
          };
          console.log("Input to get /users/byUserId ", user1);
          $http.get('/users/byUserId', {params: user1}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);

            var obj = response.data[0];
            console.log("the obj :", obj);

            //construct message
            var subject = "Everyday Miracles Class Registration Confirmation";
            var message = "You have successfully registered for Everyday Miracles Class " + $scope.registeredEvents[0].title + " " +
                moment(userEvents[0].schedule_date).format("MM-DD-YYYY") + " " + moment(userEvents[0].start_datetime).format("h:mm a") +
                " - " + moment(userEvents[0].end_datetime).format("h:mm a") + ".";
            console.log("message ", message);

            //check type of contact method and send message
            if (obj.contact_type=="email" && obj.email_address != null){
              console.log("they have an email address!");
              var emailMessage = {
                "sendTo[]": [obj.email_address],
                subject: subject,
                message: message
              };

              console.log(emailMessage);
              $http.get('/notifications/email', {params: emailMessage}).then(function (response) {
                console.log("output from /notifications/email ", response.data);
              });

              //emailArray.push(obj.email_address);
            }else if (obj.contact_type=="text" && obj.phone_number != null){
              console.log("they have a phone number!");
              var textMessage = {
                "phoneNumber[]": [obj.phone_number],
                message: message.substring(0, 159)
              };

              console.log(textMessage);
              $http.get('/notifications/text', {params: textMessage}).then(function (response) {
                console.log("output from /notifications/text ", response.data);
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
    console.log("I hit the go back button: ");
  };

  $scope.getRegisteredClasses();

}]);
