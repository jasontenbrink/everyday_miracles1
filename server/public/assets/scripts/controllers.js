app.controller('AddEventController',['$scope', '$http', '$localstorage', function ($scope, $http, $localstorage) {

  $scope.event = {};
  $scope.eventSchedule = [];
  $scope.gridOptions = {};
  $scope.teachers = [];
  $scope.categories = [];

  $scope.eventScheduleAdd = {};

  $scope.eventInsertBoolean = $localstorage.get('eventInsertBoolean');
  $scope.event.eventId = $localstorage.get('eventId');

  console.log("add event local storage ", $scope.eventInsertBoolean, $scope.event.eventId);

  $scope.submitEvent = function() {
    var event = {
      eventId: $scope.event.eventId,
      title: $scope.event.title,
      description: $scope.event.description,
      eventCategoryId: $scope.event.eventCategoryId,
      repeatType: $scope.event.repeatType,
      repeatFromDate: $scope.event.repeatFromDate,
      repeatToDate: $scope.event.repeatToDate,
      repeatSundayInd: $scope.event.repeatSundayInd,
      repeatMondayInd: $scope.event.repeatMondayInd,
      repeatTuesdayInd: $scope.event.repeatTuesdayInd,
      repeatWednesdayInd: $scope.event.repeatWednesdayInd,
      repeatThursdayInd: $scope.event.repeatThursdayInd,
      repeatFridayInd: $scope.event.repeatFridayInd,
      repeatSaturdayInd: $scope.event.repeatSaturdayInd
    };

    if ($scope.eventInsertBoolean=='true') {
      // insert data
      console.log("Input to post /event ", event);
      $http.post('/event', event).then(function (response) {
        console.log("Output from post /event ", response.data);
        $scope.event.eventId = response.data.rows[0].event_id;
        $scope.eventInsertBoolean = false;

        $localstorage.set('eventId', $scope.event.eventId);
        $localstorage.set('eventInsertBoolean', $scope.eventInsertBoolean);

      });
    } else {
      // update data
      console.log("Input to update /event ", event);
      $http.put('/event', event).then(function (response) {
        console.log("Output from update /event ", response.data);
      });
    }
  };

  $scope.loadEventData = function() {
    var passingEvent = {eventId: $scope.event.eventId};

    console.log("Input to get /event/byEventId ", passingEvent);
    $http.get('/event/byEventId', {params: passingEvent}).then(function(response){
      console.log("Output from get /event/byEventId ", response.data);
      // Set scope values
      $scope.event.eventId = response.data[0].event_id;
      $scope.event.title = response.data[0].title;
      $scope.event.description = response.data[0].description;
      $scope.event.eventCategoryId = response.data[0].event_category_id;
      $scope.event.repeatType = response.data[0].repeat_type;
      $scope.event.repeatFromDate = response.data[0].repeat_from_date;
      $scope.event.repeatToDate = response.data[0].repeat_to_date;
      $scope.event.repeatSundayInd = response.data[0].repeat_sunday_ind;
      $scope.event.repeatMondayInd = response.data[0].repeat_monday_ind;
      $scope.event.repeatTuesdayInd = response.data[0].repeat_tuesday_ind;
      $scope.event.repeatWednesdayInd = response.data[0].repeat_wednesday_ind;
      $scope.event.repeatThursdayInd = response.data[0].repeat_thursday_ind;
      $scope.event.repeatFridayInd = response.data[0].repeat_friday_ind;
      $scope.event.repeatSaturdayInd = response.data[0].repeat_saturday_ind;

      if ($scope.event.repeatFromDate !== null) {
        $scope.event.repeatFromDate = new Date($scope.event.repeatFromDate);
      }
      if ($scope.event.repeatToDate !== null) {
        $scope.event.repeatToDate = new Date($scope.event.repeatToDate);
      }

      $scope.loadEventScheduleData();
    });
  };

  if ($scope.eventInsertBoolean=='false') {
    console.log("loading event");
    $scope.loadEventData();
  } else {
    // set the schedule date
    $scope.eventScheduleAdd.scheduleDate = new Date($localstorage.get('eventDate'));
  }

  $scope.loadEventScheduleData = function() {
    var passingEvent = {eventId: $scope.event.eventId};
    // load up the event schedule grid
    console.log("Input to get /eventSchedule/byEventId ", passingEvent);
    $http.get('/eventSchedule/byEventId', {params: passingEvent}).then(function(response){
      console.log("Output from get /eventSchedule/byEventId ", response.data);
      $scope.eventSchedule = response.data;

      $scope.gridOptions = {
        columnDefs : [
          { name: 'event_schedule_id', displayName: 'Event Schedule ID', width:"10%"},
          { name: 'event_id', displayName: 'Event ID', width:"10%"},
          { name: 'schedule_date', cellFilter:"date: 'fullDate'", displayName: 'Schedule Date', width:"20%"},
          { name: 'teacher_name', displayName: 'Teacher Name', width:"20%"},
          { name: 'start_datetime', cellFilter:"date: 'shortTime'", displayName: 'Start Time', width:"10%"},
          { name: 'end_datetime', cellFilter:"date: 'shortTime'", displayName: 'End Time', width:"10%"},
          {name: 'Action', width:"10%",
            cellEditableCondition: false,
            cellTemplate: '<button ng-click="grid.appScope.deleteEventSchedule(row.entity)" class="ui-grid-button">Delete</button>' }],
        data: $scope.eventSchedule
      };
    });
  };

  // load up teacher drop down
  $http.get('/users/teachers').then(function (response) {
    $scope.teachers = response.data;
  });

  // load up category drop down
  $http.get('/event/categories').then(function (response) {
    $scope.categories = response.data;
  });

  $scope.submitEventSchedule = function() {

    var addEventScheduleArray = [];

    var month = new Date($scope.eventScheduleAdd.scheduleDate).getMonth();
    var day = new Date($scope.eventScheduleAdd.scheduleDate).getDate();
    var year = new Date($scope.eventScheduleAdd.scheduleDate).getFullYear();

    var startHours = new Date($scope.eventScheduleAdd.startDateTime).getHours();
    var startMinutes = new Date($scope.eventScheduleAdd.startDateTime).getMinutes();

    var endHours = new Date($scope.eventScheduleAdd.endDateTime).getHours();
    var endMinutes = new Date($scope.eventScheduleAdd.endDateTime).getMinutes();

    var startDateTime = new Date(year, month, day, startHours, startMinutes, 0);
    var endDateTime = new Date(year, month, day, endHours, endMinutes, 0);

    console.log("start date ", startDateTime, " end date ", endDateTime);

    var repeatType = $scope.event.repeatType;
    var repeatBoolean = true;
    var insertDate = $scope.eventScheduleAdd.scheduleDate;

    do {

      addEventScheduleArray.push({
        eventId: $scope.event.eventId,
        scheduleDate: new Date(insertDate),
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        teacherUserId: $scope.eventScheduleAdd.teacherUserId
      });

      if (repeatType == "None") {
        repeatBoolean = false;
      } else if (repeatType == "Daily") {
        insertDate = new Date(moment(insertDate).add(1, 'days'));
        startDateTime = new Date(moment(startDateTime).add(1, 'days'));
        endDateTime = new Date(moment(endDateTime).add(1, 'days'));
      } else if (repeatType == "Weekly") {
        insertDate = new Date(moment(insertDate).add(1, 'weeks'));
        startDateTime = new Date(moment(startDateTime).add(1, 'weeks'));
        endDateTime = new Date(moment(endDateTime).add(1, 'weeks'));
      } else if (repeatType == "Monthly") {
        insertDate = new Date(moment(insertDate).add(1, 'months'));
        startDateTime = new Date(moment(startDateTime).add(1, 'months'));
        endDateTime = new Date(moment(endDateTime).add(1, 'months'));
      } else {
        repeatBoolean = false;
      }

      if (insertDate > $scope.event.repeatToDate) {
        repeatBoolean = false;
      }

    } while (repeatBoolean);

    //do an insert always
    console.log("Input to post /eventSchedule ", addEventScheduleArray);
    $http.post('/eventSchedule', addEventScheduleArray).then(function (response) {
      console.log("Output from post /eventSchedule ", response.data);
      $scope.loadEventScheduleData();
    });
  };

  $scope.deleteEventSchedule = function(deleteObject) {
    console.log("object ", deleteObject);

    var answer = confirm("Are you sure you want to delete event schedule id " + deleteObject.event_schedule_id + "?");
    if (answer){
      $http.delete('/eventSchedule/delete'+ deleteObject.event_schedule_id).then(function(response){
        $scope.loadEventScheduleData();
      });
    }
    else {
      // do nothing
    }
  }

}]);

app.controller('AddWalkinController',['$scope', '$http', '$localstorage', '$location',
    function ($scope, $http, $localstorage, $location) {

        $scope.usersEventSchedule = [];
        $scope.event = {};
        $scope.user = {};

        $scope.eventId = $localstorage.get('eventId');
        $scope.eventScheduleId = $localstorage.get('eventScheduleId');

        var event2 = {eventId: $scope.eventId,
            eventScheduleId: $scope.eventScheduleId};

        console.log("Input to get /event/byEventIdEventScheduleId ", event2);
        $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
            console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
            $scope.event = response.data[0];
        });

        $scope.addWalkin = function() {
            var insertuser = {
                //userName: 'null',
                //password: 'null',
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                roleId: 1,
                dateOfBirth: $scope.user.dateOfBirth,
                phoneNumber: $scope.user.phoneNumber,
                //emailAddress: 'null',
                //contactType: 'null',
                paymentType: $scope.user.paymentType,
                everydayMiraclesClientInd: false
                //doulaName: 'null',
                //expectedBirthDate: 'null'
            };

            console.log("Input to post /users ", insertuser);
            $http.post('/users', insertuser).then(function (response) {
                console.log("Output from post /users ", response.data);

                if (response.data.rows[0].user_id) {
                    // insert into users event schedule
                    var userEvent = {
                        userId: response.data.rows[0].user_id,
                        eventScheduleId: $scope.eventScheduleId,
                        status: 'Attended',
                        comments: ''
                    };

                    console.log("Input to post /usersEventSchedule ", userEvent);
                    $http.post('/usersEventSchedule', userEvent).then(function (response) {
                        console.log("Output from post /usersEventSchedule ", response.data);
                        alert("Created student.  Redirecting to Attendance.");
                        $location.path('/attendance');
                    });
                }
            });

        }

    }]);

app.controller('AttendanceController',['$scope', '$http', '$localstorage', '$location',
    function ($scope, $http, $localstorage, $location) {

    $scope.usersEventSchedule = [];
    $scope.event = {};

    $scope.eventId = $localstorage.get('eventId');
    $scope.eventScheduleId = $localstorage.get('eventScheduleId');

    var event2 = {eventId: $scope.eventId,
        eventScheduleId: $scope.eventScheduleId};

    console.log("Input to get /event/byEventIdEventScheduleId ", event2);
    $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
        console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
        $scope.event = response.data[0];
    });

    // get data from the database
    var eventSchedule = {eventScheduleId: $scope.eventScheduleId};

    console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
    $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        //console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
        $scope.usersEventSchedule = response.data;
        console.log("userseventschedule ", $scope.usersEventSchedule);
    });

    $scope.submitAttendance = function() {
        for (var i = 0; i < $scope.usersEventSchedule.length; i++) {

            console.log("changed ", $scope.usersEventSchedule[i].changed);
            if ($scope.usersEventSchedule[i].changed) {

                var userEvent = {
                    userId: $scope.usersEventSchedule[i].user_id,
                    eventScheduleId: $scope.usersEventSchedule[i].event_schedule_id,
                    status: $scope.usersEventSchedule[i].status,
                    comments: ''
                };

                console.log("Input to update /usersEventSchedule ", userEvent);
                $http.put('/usersEventSchedule', userEvent).then(function (response) {
                    console.log("Output from update /usersEventSchedule ", response.data);
                });
                $scope.usersEventSchedule[i].changed = false;
            }
        }
    }

    $scope.findWalkin = function() {
        $location.path('/findwalkin');
    }

}]);

app.controller('CalendarController',['$scope', function ($scope) {
  console.log('hi, from calendarController');
  $scope.x = 'hi';
  $scope.y = 'bye';
  $scope.gridOptions={};
  $scope.gridOptions.data = [
    {"firstName": "Jason", "lastName": "Tenbrink"},
    {"firstName": "Paul", "lastName": "Zimmel"}
  ];
}]);


app.controller("ChangePasswordController", ["$scope", "$http", "$location", "ActiveProfileFactory",
    function($scope, $http, $location, ActiveProfileFactory){
        //console.log("hi from changepasswordcontroller");
        //$scope.hi = "hi from controller"
        $scope.user = {};
        var activeProfileFactory = ActiveProfileFactory;

        $scope.user = activeProfileFactory.getActiveProfileData();
        $scope.confirmPassword = function(someuser){
            console.log("the user and their password to change: ",$scope.user);
            $http.put('/changePassword', {params: $scope.user}).then(function(response){
                console.log("Response from the change password attempt");
            });
        };
    }]);

app.controller('ChooseClassDatesController',['$scope', '$http', "$localstorage", '$location', "ActiveProfileFactory",
  "RegisterForClassFactory",
  function ($scope, $http, $localstorage, $location, ActiveProfileFactory, RegisterForClassFactory) {
  console.log('hi, from choose class dates Controller');

  $scope.today = new Date();

  $scope.userId = $localstorage.get("userId");

  $scope.event = [];
  $scope.registeredEvents = [];
  $scope.studentEvents = [];
  $scope.allUserEvents = [];

  $scope.eventId = $localstorage.get("eventId");
  $scope.eventScheduleId = $localstorage.get("eventScheduleId");

  //get factory
  $scope.registerForClassFactory = RegisterForClassFactory;

  //get classes user has already registered for
  $scope.getRegisteredClasses = function() {

    var eventSchedule = {
      userId: $scope.userId,
      eventId: $scope.eventId
    };

    //console.log("in registered classes(). the event :",eventSchedule);
    $http.get('/usersEventSchedule/byEventIdUserId', {params: eventSchedule}).then(function(response){
      console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
      $scope.registeredEvents = response.data;
      $scope.checkRegisteredClasses();
    });
  };

  //get all class instances for this particular class
  $scope.loadEventData =  function() {

    var eventId = {
      eventId: $scope.eventId
    };
    console.log("Input to get /eventSchedule/byEventId ", eventId);

    $http.get('/eventSchedule/currentByEventId', {params: eventId})
        .then(function(response){
            console.log("Output from get /eventSchedule/currentByEventId ", response.data);
            $scope.event = response.data;
            $scope.getRegisteredClasses($scope.user);
        });
  };

  //merge the registered classes with the event data
  $scope.checkRegisteredClasses = function() {
    console.log("checkRegisteredClasses fired");
    for (var i = 0; i < $scope.registeredEvents.length; i++) {
      for (var j = 0; j < $scope.event.length; j++) {
        if ($scope.registeredEvents[i].event_schedule_id == $scope.event[j].event_schedule_id) {
            $scope.event[j].addCheckbox = true;
            //console.log("true");
        }
        if ($scope.event[j].event_schedule_id == $scope.eventScheduleId) {
          console.log("making sure the event clicked on is checked");
          $scope.event[j].addCheckbox = true;
        }
      }
    }
    console.log("$scope.event after for loops :",$scope.event);
  };

  $scope.loadEventData();


  $scope.signUp = function() {

    for (var i = 0; i < $scope.event.length; i++) {
      if ($scope.event[i].addCheckbox == true) {
        $scope.studentEvents.push($scope.event[i]);

      }
    }
    console.log("studentEvents loop ", $scope.studentEvents);
    $scope.registerForClassFactory.setStudentEvents({});
    $scope.registerForClassFactory.setStudentEvents($scope.studentEvents);
    console.log("registerForClassFactory ", $scope.registerForClassFactory.getStudentEvents());

    $location.path('/confirmclasssignup');
  };

  $scope.goBack = function () {
    $location.path('/eventdetails');
    //console.log("I hit the go back button: ");
  };
}]);

app.controller('ConfirmClassSignupController',['$scope', '$http', "RegisterForClassFactory", '$location', "$localstorage",
  function ($scope, $http, RegisterForClassFactory, $location, $localstorage) {

  $scope.userId = $localstorage.get("userId");
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

app.controller('DirectoryController',['$scope', '$http', 'ActiveProfileFactory',
'uiGridConstants', '$localstorage',
  function ($scope, $http, ActiveProfileFactory, uiGridConstants, $localstorage) {

  var activeProfileFactory = ActiveProfileFactory;
  console.log('hi, from Directory Controller');
  $scope.searchObject = new SearchObject();
  $scope.gridOptions = {};

//sets user on activeProfile Factory
  $scope.sendSelectedMemberInfo = function(id) {
    console.log('this is the user id', id);
    //activeProfileFactory.setActiveProfileData(id);
    $localstorage.set("userId", id);
  };

  $scope.gridOptions = {
    columnDefs: [
           { field: 'first_name',
             cellTemplate: '<a ng-click="grid.appScope.sendSelectedMemberInfo(row.entity.user_id)" ' +
             'href="#/profile">{{COL_FIELD}}</a>',
             sort: {
               direction: uiGridConstants.ASC,
               priority: 1
             }
           },
           { field: 'last_name',
              sort: {direction: uiGridConstants.ASC, priority: 2}
           },
           { field: 'phone_number'},
           {field: 'user_id', visible: false}
         ],
    enableFullRowSelection: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  $scope.getResults = function () {
    console.log("search object, ", $scope.searchObject);
    $http.get('/users/byNameOrPhone',
        {params: $scope.searchObject}
      )
      .then(
        function (response) {
          console.log('response from server', response.data);
          $scope.gridOptions.data = response.data;
        }
      );
  };
  var getData = function (queryParams) {
    console.log('heading out from factory', queryParams);
    var promise = $http.get('/data',
      {params: queryParams}
    )
    .then(
      function (response) {
        console.log('response from server', response.data);
        data = response.data;
      }
    );
    return promise;
  };
}]);

function SearchObject() {
          this.firstName='';
          this.lastName='';
          this.phoneNumber='';
        }

app.controller('EditEventController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from edit event Controller');
}]);

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

      });

      //delete the users from the class then delete the class
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

app.controller('FindWalkinController',['$scope', '$http', '$localstorage', '$location',
    function ($scope, $http, $localstorage, $location) {

        $scope.usersEventSchedule = [];
        $scope.event = {};
        $scope.user = {};
        $scope.foundUser = [];

        $scope.eventId = $localstorage.get('eventId');
        $scope.eventScheduleId = $localstorage.get('eventScheduleId');

        var event2 = {eventId: $scope.eventId,
            eventScheduleId: $scope.eventScheduleId};

        console.log("Input to get /event/byEventIdEventScheduleId ", event2);
        $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
            console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
            $scope.event = response.data[0];
        });

        $scope.findWalkin = function() {

            console.log("Input to get /users/byNameOrPhone ", $scope.user);
            $http.get('/users/byNameOrPhone', {params: $scope.user}).then(function (response) {
                console.log("Output from get /users/byNameOrPhone ", response.data);
                $scope.foundUser = response.data[0];
                $scope.foundUser.expected_birth_date = new Date($scope.foundUser.expected_birth_date);
            });
        };

        $scope.submitUser = function() {
            console.log("submitting user ", $scope.foundUser);

            var updateUser = {
                userId: $scope.foundUser.user_id,
                userName: $scope.foundUser.user_name,
                firstName: $scope.foundUser.first_name,
                lastName: $scope.foundUser.last_name,
                roleId: $scope.foundUser.role_id,
                dateOfBirth: new Date($scope.foundUser.date_of_birth),
                phoneNumber: $scope.foundUser.phone_number,
                emailAddress: $scope.foundUser.email_address,
                contactType: $scope.foundUser.contact_type,
                paymentType: $scope.foundUser.payment_type,
                everydayMiraclesClientInd: $scope.foundUser.everyday_miracles_client_ind,
                doulaName: $scope.foundUser.doula_name,
                expectedBirthDate: new Date($scope.foundUser.expected_birth_date)
            };

            // update the user information
            console.log("Input to put /users ", updateUser);
            $http.put('/users', updateUser).then(function (response) {
                console.log("Output from put /users ", response.data);
            });

            //insert into database
            var userEvent = {
                userId: $scope.foundUser.user_id,
                eventScheduleId: $scope.eventScheduleId,
                status: 'Attended',
                comments: ''
            };
            console.log("Input to post /usersEventSchedule ", userEvent);

            // see if the user is already in the class
            $http.get('/usersEventSchedule/byUserIdEventScheduleId', {params: userEvent}).then(function(response){
                console.log("Output from get /usersEventSchedule/byUserIdEventScheduleId ", response.data);
                if(userEvent.userId == response.data[0].user_id) {
                    alert("Student already in the class.");
                } else {
                    // insert into user event schedule table
                    $http.post('/usersEventSchedule', userEvent).then(function (response) {
                        console.log("Output from post /usersEventSchedule ", response.data);
                        // go back to attendance page
                        if(response.data==true){
                            alert("Student submitted as attended.");
                            $location.path('/attendance');
                        }
                    });
                }
            });
        };

        $scope.newUser = function() {
            $location.path('/addwalkin');
        };


}]);

app.controller('JadeController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from jade Controller');
  $scope.x = 'angular';
  $scope.y = 'bye';
  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

}]);

app.controller('LoginController',['$scope', '$http', '$location', 'ActiveProfileFactory', "$localstorage", '$window',
  function ($scope, $http, $location, ActiveProfileFactory, $localstorage, $window) {

  var activeProfileFactory = ActiveProfileFactory;
  console.log('hi, from Login Controller');

  $scope.user = {};
  $scope.submitCredentials = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/login', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        //console.log('response status', response.status);
        if (response.status===200){
          activeProfileFactory.setLoggedInUser(response.data.userId);

          var user = ActiveProfileFactory.getLoggedInUser();
          console.log("the user from ActiveProfile: ",user);
          if (user.userId) {
            $localstorage.set("userId", user.userId);
          }
          $scope.userId = $localstorage.get("userId");
          console.log("the user: ", $scope.userId);
          $window.location.reload();
          $location.path('/uicalendar');
        }
        else{
          // $location.path('/failure');
          alert('sign in failed');
        }

      });
  };

  $scope.go = function (path) {
    $location.path(path);
  };

}]);

app.controller('NavController',['$scope', 'ActiveProfileFactory', '$location', '$localstorage', '$http','$window',
  function ($scope, ActiveProfileFactory, $location, $localstorage, $http, $window) {

  var activeProfileFactory = ActiveProfileFactory;

  $scope.goToProfile = function () {
    activeProfileFactory.setLoggedInUserToActiveProfile();
    $location.path('/profile');
  };

  $scope.go = function (path) {
    $location.path(path);
  }; 
  $scope.logout = function () {
    $http.get('/logout')
    .then(function (response) {
      $window.location.reload();
      $location.path('/uicalendar');
    });
  };
}]);

app.controller("ProfileController", ["$scope", "$http", "ActiveProfileFactory", "$location", "$localstorage",
  function($scope, $http, ActiveProfileFactory, $location, $localstorage){
    var activeProfileFactory = ActiveProfileFactory;
    $scope.user = {};
    $scope.tempUser = {};

    //var testUser = activeProfileFactory.getActiveProfileData();
    //console.log('testUser.userId', testUser.userId);
      var testUserId = $localstorage.get("userId");
      console.log("the user: ", testUserId);

    //get profile info for profile page
    $scope.getUser = function(){
        var user = {
            userId: testUserId
        };
        console.log("the input of getUser: ",user);
        $http.get('/users/byUserId', {params: user}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
            $scope.tempUser = response.data[0];

            //define $scope.user
            $scope.user.firstName = $scope.tempUser.first_name;
            $scope.user.lastName = $scope.tempUser.last_name;
            $scope.user.userId = $scope.tempUser.user_id;
            $scope.user.userName = $scope.tempUser.user_name;
            $scope.user.roleName = $scope.tempUser.role_name;
            $scope.user.roleId = $scope.tempUser.role_id;
            $scope.user.dateOfBirth = $scope.tempUser.date_of_birth;
            if ($scope.user.dateOfBirth !== null) {
                $scope.user.dateOfBirth = new Date($scope.user.dateOfBirth);
            }
            $scope.user.phoneNumber = $scope.tempUser.phone_number;
            $scope.user.emailAdress = $scope.tempUser.email_address;
            $scope.user.contactType = $scope.tempUser.contact_type;
            $scope.user.paymentType = $scope.tempUser.payment_type;
            $scope.user.everydayMiraclesClientInd = $scope.tempUser.everyday_miracles_client_ind;
            $scope.user.doulaName = $scope.tempUser.doula_name;
            $scope.user.expectedBirthDate = $scope.tempUser.expected_birth_date;
            if ($scope.user.expectedBirthDate !==null){
                $scope.user.expectedBirthDate = new Date($scope.user.expectedBirthDate);
            }

            console.log("the #scope.user: ", $scope.user);
        });
    };

    $http.get('/users/roles').then(function (response) {
        $scope.roles = response.data;
    });

    //save profile
    $scope.saveProfile = function() {
        console.log("Input to put /users ", $scope.user);

        $http.put('/users', $scope.user).then(function (response) {
            console.log("Output from put /users ", response.data);
        });
    };

    //change password
    $scope.changePassword = function() {
        console.log("clicked the change password");
        $location.path('/changepassword');
    };
    $scope.getUser();

}]);

app.controller('StudentClassListController', ["$scope", "$http", "$localstorage",
    function($scope, $http, $localstorage){

    $scope.userId = $localstorage.get("userId");

    $scope.user = {};
    $scope.allClasses = [];
    $scope.gridOptions1 = {};
    $scope.gridOptions1.data = [];
    $scope.gridOptions2 = {};
    $scope.gridOptions2.data = [];

    $scope.clearVariables = function() {
        $scope.allClasses = [];
        $scope.gridOptions1 = {};
        $scope.gridOptions1.data = [];
        $scope.gridOptions2 = {};
        $scope.gridOptions2.data = [];
    };

    $scope.gridOptions1 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "start_datetime", cellFilter: "date: 'M/d h:mm'", name: "Date"},
            {field: "status", name: "Status", visible:false},
            {name: "action", displayName: "Action", cellTemplate: '<md-button class = "md-raised md-warn"' +
            'ng-click="grid.appScope.deleteClass(row.entity)">delete</md-button>'}
        ]
    };
    $scope.gridOptions2 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "start_datetime", cellFilter: "date: 'M/d h:mm'", name: "Date"},
            {field: "status", name: "Status"}
        ]
    };

    //test user info
    //$scope.user.userId = 1;

    //get user info
    $scope.getUserInfo = function() {
        var user = {
            userId: $scope.userId
        };
        $http.get('/users/byUserId', {params: user}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
            $scope.user = response.data;
        });
    };

    $scope.getClasses = function() {
        var userObject = {
            userId: $scope.userId
        };
        $http.get('/usersEventSchedule/byUserId', {params: userObject}).then(function(response){
            console.log("Output from get /usersEventSchedule/byUserId ", response.data);
            $scope.allClasses = response.data;
            for (var i = 0; i < $scope.allClasses.length; i++) {
                if ($scope.allClasses[i].status == "Registered") {
                    $scope.gridOptions1.data.push($scope.allClasses[i]);
                } else if ($scope.allClasses[i].status == "Attended") {
                    $scope.gridOptions2.data.push($scope.allClasses[i]);
                }
            }
        });
    };

    $scope.deleteClass = function(someclass) {
        console.log("someclass: ", someclass);
        //$scope.deleteUsersEventSchedule = function() {
        //
            var event = {userId: someclass.user_id,
                eventScheduleId: someclass.event_schedule_id};
        console.log("variable event: ", event);
        //
            $http.get('/usersEventSchedule/delete', {params: event}).then(function(response){
                console.log("output from delete userseventSchedule ", response.data);
                $scope.clearVariables();
                $scope.getClasses();
            });
        //};
    };

    $scope.getUserInfo();
    $scope.getClasses();

}]);
app.controller('TestSqlController',['$scope', '$http', function ($scope, $http) {

    $scope.selectUsers = function() {
        var user = {userName: 'testuser1'};

        console.log("Input to get /users/byUserName ", user);
        $http.get('/users/byUserName', {params: user}).then(function (response) {
            console.log("Output from get /users/byUserName ", response.data);
        });

        var user2 = {
            firstName: 'test',
            lastName: '',
            phoneNumber: ''
        };
        console.log("Input to get /users/byNameOrPhone ", user2);
        $http.get('/users/byNameOrPhone', {params: user2}).then(function (response) {
            console.log("Output from get /users/byNameOrPhone ", response.data);
        });

        var user1 = {
            userId: 1
        };
        console.log("Input to get /users/byUserId ", user1);
        $http.get('/users/byUserId', {params: user1}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
        });

        console.log("Input to get /users/roles - nothing");
        $http.get('/users/roles').then(function (response) {
            console.log("Output from get /users/roles ", response.data);
        });
        console.log("Input to get /users/teachers - nothing");
        $http.get('/users/teachers').then(function (response) {
            console.log("Output from get /users/teachers ", response.data);
        });
    };
    $scope.insertUsers = function() {
        var insertuser = {
            userName: 'anotheruser',
            password: 'adfasl',
            firstName: 'noch',
            lastName: 'ein',
            roleId: 1,
            dateOfBirth: '2000-02-02',
            phoneNumber: '12345678',
            emailAddress: 'emailme',
            contactType: 'email',
            paymentType: 'insurance',
            everydayMiraclesClientInd: false,
            doulaName: 'Paula Ab',
            expectedBirthDate: '2016-01-01'
        };

        console.log("Input to post /users ", insertuser);
        $http.post('/users', insertuser).then(function (response) {
            console.log("Output from post /users ", response.data);
        });
    };

    $scope.updateUsers = function() {
        var updateUser = {
            userId: 3,
            userName: 'anotherusernumber3',
            password: 'adfasl2e2',
            firstName: 'nochsda',
            lastName: 'einfaf',
            roleId: 1,
            dateOfBirth: '2000-02-02',
            phoneNumber: '12345678',
            emailAddress: 'emailme',
            contactType: 'email',
            paymentType: 'insurance',
            everydayMiraclesClientInd: false,
            doulaName: 'Paula Ab',
            expectedBirthDate: '2016-01-01'
        };

        console.log("Input to put /users ", updateUser);
        $http.put('/users', updateUser).then(function (response) {
            console.log("Output from put /users ", response.data);
        });
    };

    $scope.deleteUsers = function() {

        var userId = 7;

        $http.delete('/users/delete'+ userId).then(function(response){
            console.log("output from delete ", response.data);
        });

    };

    $scope.selectEvent = function() {
        var event1 = {startDate: '2015-01-01',
                    endDate: '2015-12-31'};

        console.log("Input to get /event/byDateRange ", event1);
        $http.get('/event/byDateRange', {params: event1}).then(function(response){
            console.log("Output from get /event/byDateRange ", response.data);
        });

        var event2 = {eventId: 1,
            eventScheduleId: 1};

        console.log("Input to get /event/byEventIdEventScheduleId ", event2);
        $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
            console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
        });

        var event3 = {eventId: 1};

        console.log("Input to get /event/byEventId ", event3);
        $http.get('/event/byEventId', {params: event3}).then(function(response){
            console.log("Output from get /event/byEventId ", response.data);
        });

        console.log("Input to get /event/categories - nothing");
        $http.get('/event/categories').then(function (response) {
            console.log("Output from get /event/categories ", response.data);
        });

    };

    $scope.insertEvent = function() {
        var event = {
            title: 'this is another event',
            description: 'another desc',
            eventCategoryId: 1,
            repeatType: 'weekly',
            repeatFromDate: '2011-01-04',
            repeatToDate: '2012-04-05',
            repeatSundayInd: false,
            repeatMondayInd: false,
            repeatTuesdayInd: false,
            repeatWednesdayInd: false,
            repeatThursdayInd: false,
            repeatFridayInd: false,
            repeatSaturdayInd: false
        };

        console.log("Input to post /event ", event);
        $http.post('/event', event).then(function (response) {
            console.log("Output from post /event ", response.data);
        });
    };

    $scope.updateEvent = function() {
        var event = {
            eventId: 2,
            title: 'newtitle',
            description: 'new desc',
            eventCategoryId: 1,
            repeatType: 'daily',
            repeatFromDate: '2014-01-04',
            repeatToDate: '2016-04-05',
            repeatSundayInd: true,
            repeatMondayInd: true,
            repeatTuesdayInd: true,
            repeatWednesdayInd: true,
            repeatThursdayInd: true,
            repeatFridayInd: true,
            repeatSaturdayInd: true
        };

        console.log("Input to update /event ", event);
        $http.put('/event', event).then(function (response) {
            console.log("Output from update /event ", response.data);
        });

    };

    $scope.deleteEvent = function() {

        var eventId = 3;

        $http.delete('/event/delete'+ eventId).then(function(response){
            console.log("output from delete event ", response.data);
        });

    };

    $scope.selectEventSchedule = function() {

        var event = {eventId: 1};

        console.log("Input to get /eventSchedule/byEventId ", event);
        $http.get('/eventSchedule/byEventId', {params: event}).then(function(response){
            console.log("Output from get /eventSchedule/byEventId ", response.data);
        });

        var event2 = {eventId: 1};

        console.log("Input to get /eventSchedule/currentByEventId ", event2);
        $http.get('/eventSchedule/currentByEventId', {params: event2}).then(function(response){
            console.log("Output from get /eventSchedule/currentByEventId ", response.data);
        });

    };

    $scope.insertEventSchedule = function() {
        var event = {
            eventId: 1,
            scheduleDate: '2015-12-22',
            startDateTime: '04:04:04',
            endDateTime: '05:05:05',
            teacherUserId: null
        };

        console.log("Input to post /eventSchedule ", event);
        $http.post('/eventSchedule', event).then(function (response) {
            console.log("Output from post /eventSchedule ", response.data);
        });
    };

    $scope.updateEventSchedule = function() {
        var event = {
            eventScheduleId: 1,
            eventId: 1,
            scheduleDate: '2011-12-22',
            startDateTime: '11:04:04',
            endDateTime: '12:05:05',
            teacherUserId: null
        };

        console.log("Input to update /eventSchedule ", event);
        $http.put('/eventSchedule', event).then(function (response) {
            console.log("Output from update /eventSchedule ", response.data);
        });

    };

    $scope.deleteEventSchedule = function() {

        var eventScheduleId = 3;

        $http.delete('/eventSchedule/delete'+ eventScheduleId).then(function(response){
            console.log("output from delete eventSchedule ", response.data);
        });

    };

    $scope.selectUsersEventSchedule = function() {

        var user = {userId: 1};

        console.log("Input to get /usersEventSchedule/byUserId ", user);
        $http.get('/usersEventSchedule/byUserId', {params: user}).then(function(response){
            console.log("Output from get /usersEventSchedule/byUserId ", response.data);
        });

        var user2 = {userId: 1, eventId: 1};

        console.log("Input to get /usersEventSchedule/byEventIdUserId ", user2);
        $http.get('/usersEventSchedule/byEventIdUserId', {params: user2}).then(function(response){
            console.log("Output from get /usersEventSchedule/byEventIdUserId ", response.data);
        });

        var eventSchedule = {eventScheduleId: 1};

        console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
        $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
            console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
        });

        var usereventSchedule = {userId:1, eventScheduleId: 1};

        console.log("Input to get /usersEventSchedule/byUserIdEventScheduleId ", usereventSchedule);
        $http.get('/usersEventSchedule/byUserIdEventScheduleId', {params: usereventSchedule}).then(function(response){
            console.log("Output from get /usersEventSchedule/byUserIdEventScheduleId ", response.data);
        });

    };

    $scope.insertUsersEventSchedule = function() {
        var userEvent = {
            userId: 1,
            eventScheduleId: 2,
            status: 'registered',
            comments: 'this is a comment'
        };

        console.log("Input to post /usersEventSchedule ", userEvent);
        $http.post('/usersEventSchedule', userEvent).then(function (response) {
            console.log("Output from post /usersEventSchedule ", response.data);
        });
    };

    $scope.updateUsersEventSchedule = function() {
        var userEvent = {
            userId: 1,
            eventScheduleId: 2,
            status: 'attended',
            comments: 'this is an updated comment'
        };

        console.log("Input to update /usersEventSchedule ", userEvent);
        $http.put('/usersEventSchedule', userEvent).then(function (response) {
            console.log("Output from update /usersEventSchedule ", response.data);
        });

    };

    $scope.deleteUsersEventSchedule = function() {

        var event = {userId: 1,
                    eventScheduleId: 2};

        $http.get('/usersEventSchedule/delete', {params: event}).then(function(response){
            console.log("output from delete userseventSchedule ", response.data);
        });
    };

    $scope.classCancelled = function() {
        var textMessage = {
            userId: "Dana",
            classTitle: '"Mom to mom" class',
            dateTime: 'Dec. 17th 6:00pm',
            comments: 'cancelled'
        };

        console.log(textMessage);
        $http.get('/usersEventSchedule/classCancelled/data', {params: textMessage}).then(function(response){
            console.log("output from classCancelled ", response.data);
        });

    };

    $scope.notifications = function() {
        var phoneNumber = ["6129783936", "6518906678"];

        var textMessage2 = {
            "phoneNumber[]": phoneNumber,
            message: "this is a test text message"
        };

        console.log(textMessage2);
        $http.get('/notifications/text', {params: textMessage2}).then(function(response){
            console.log("output from /notifications/text ", response.data);
        });

        var emailMessage = {
            "sendTo[]": ['jdrew5@hotmail.com', 'jason.tenbrink@gmail.com'],
            subject: "this is a subject",
            message: "this is a test email message"
        };

        console.log(emailMessage);
        $http.get('/notifications/email', {params: emailMessage}).then(function(response){
            console.log("output from /notifications/email ", response.data);
        });

    };

}]);

app.controller('UiCalendarController', ["$scope", "$http", "RegisterForClassFactory", "$location", "$localstorage",
    function($scope, $http, RegisterForClassFactory, $location, $localstorage) {
    console.log("hi from ui calendar controller");
    /* config object */
    $scope.tempEvents;
    $scope.eventSources = {};
    $scope.eventSources.events = [];
    $scope.uiConfig = {};
    $scope.registerForClassFactory = RegisterForClassFactory;

    //load the calendar
    $scope.loadCalendar = function(){
        //sets dateRange to the present month
        $scope.setDateRange = function() {
            $scope.today = new Date();

            $scope.month = $scope.today.getMonth();
            $scope.year = $scope.today.getFullYear();


            // the 0th day of the next month returns the last day of this month

            $scope.dateRange = {
                startDate: new Date($scope.year - 1, $scope.month, 1),
                endDate: new Date($scope.year + 1, $scope.month + 1, 0)
            };

            console.log("date range ", $scope.dateRange);

        };

        $scope.setDateRange();

        //get the events to populate calendar
        $http.get('/event/byDateRange', {params: $scope.dateRange}).then(function (response) {
            console.log("Output from get /event/byDateRange ", response.data);
            $scope.tempEvents = response.data;
            console.log("the tempEvents", $scope.tempEvents);
            //loop through results from factory call to set event info into calendar
            for (var i = 0; i < $scope.tempEvents.length; i++) {
                $scope.eventSources.events[i] = {};
                $scope.eventSources.events[i].allDay = false;
                $scope.eventSources.events[i].title = $scope.tempEvents[i].title;

                $scope.eventSources.events[i].start = new Date($scope.tempEvents[i].start_datetime);
                $scope.eventSources.events[i].end = new Date($scope.tempEvents[i].end_datetime);

                //$scope.eventSources.events[i].description = $scope.tempEvents[i].description;

                //unique id for a event
                //corresponds to property event_schedule_id in the database
                //use this to get information like attendance about a particular class
                $scope.eventSources.events[i].eventScheduleId = $scope.tempEvents[i].event_schedule_id;

                //sets event id
                //use this to get multiple dates for the same event from the database
                $scope.eventSources.events[i].eventId = $scope.tempEvents[i].event_id;

            }

            //uiConfigurations for experimentation
            $scope.uiConfig = {
                calendar:{
                    editable: true,
                    header:{
                        left: 'month basicWeek basicDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventClick: $scope.eventClick
                }
            };

        });

        //functions
        //saves the unique id of the clicked on class
        $scope.eventClick = function(event, jsEvent, view){

            console.log("this is event: ",event);
            //$scope.registerForClassFactory.setEvent(event);
            $localstorage.set("eventId", event.eventId);
            $localstorage.set("eventScheduleId", event.eventScheduleId);
            console.log("factory test: ", $scope.registerForClassFactory.getEvent());

            $location.path("/eventdetails");

        };
        //$scope.alertEventOnClick = function(date, jsEvent, view) {
        //    console.log("this is the date: ",date);
        //    console.log("this is the jsEvent: ", jsEvent);
        //
        //    $localstorage.set('eventId', null);
        //    $localstorage.set('eventDate', date.format());
        //    $localstorage.set('eventInsertBoolean', true);
        //    $location.path('/addevent');
        //};
    };

$scope.loadCalendar();

}]);


app.controller('UserRegistrationController',['$scope', '$http', '$location',
  function ($scope, $http, $location) {
  console.log('hi, from UserRegistrationController');
  $scope.user={};

  $scope.submitRegistration = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/userregistration', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        if (response.status===200){
          $location.path('/login');
        }

      });
  };


}]);
