app.controller('AddEventController',['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  $scope.insertMode = true;

  $scope.event = {};
  $scope.eventSchedule = [];
  $scope.gridOptions = {};

  $scope.eventScheduleAdd = {};

  //$scope.event.eventId = 13;

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

    if ($scope.insertMode) {
      // insert data
      console.log("Input to post /event ", event);
      $http.post('/event', event).then(function (response) {
        console.log("Output from post /event ", response.data);
        $scope.event.eventId = response.data.rows[0].event_id;
        $scope.insertMode = false;
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
      $scope.event.repeatFromDate = new Date(response.data[0].repeat_from_date);
      $scope.event.repeatToDate = new Date(response.data[0].repeat_to_date);
      $scope.event.repeatSundayInd = response.data[0].repeat_sunday_ind;
      $scope.event.repeatMondayInd = response.data[0].repeat_monday_ind;
      $scope.event.repeatTuesdayInd = response.data[0].repeat_tuesday_ind;
      $scope.event.repeatWednesdayInd = response.data[0].repeat_wednesday_ind;
      $scope.event.repeatThursdayInd = response.data[0].repeat_thursday_ind;
      $scope.event.repeatFridayInd = response.data[0].repeat_friday_ind;
      $scope.event.repeatSaturdayInd = response.data[0].repeat_saturday_ind;

      $scope.loadEventScheduleData();
    });
  }

  if (!$scope.insertMode) {
    $scope.loadEventData();
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
          { name: 'event_schedule_id', displayName: 'Event Schedule ID'},
          { name: 'event_id', displayName: 'Event ID'},
          { name: 'schedule_date', cellFilter:"date: 'fullDate'", displayName: 'Schedule Date' },
          { name: 'teacher_user_id', displayName: 'Teacher User Id' },
          { name: 'start_datetime', cellFilter:"date: 'shortTime':'-1200'", displayName: 'Start Time'},
          { name: 'end_datetime', cellFilter:"date: 'shortTime':'-1200'", displayName: 'End Time'},
          {name: 'Action',
            cellEditableCondition: false,
            cellTemplate: '<button ng-click="grid.appScope.deleteEventSchedule(row.entity)" ' +
            'class="md-raised md-primary">Delete</button>' }],
        data: $scope.eventSchedule
      };

    });
  }

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
    var endDateTime = new Date(year, month, day, endHours, endMinutes, 0)

    console.log("start date ", startDateTime, " end date ", endDateTime);

    var repeatType = $scope.event.repeatType;
    var repeatBoolean = true;
    var insertDate = $scope.eventScheduleAdd.scheduleDate;

    do {

      addEventScheduleArray.push({
        eventId: $scope.event.eventId,
        scheduleDate: insertDate,
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

    var answer = confirm("Are you sure you want to delete event schedule id " + deleteObject.event_schedule_id + "?")
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

app.controller('AddWalkinController',['$scope', '$http', function ($scope, $http) {
    console.log('hi, from add walkin Controller');
}]);

app.controller('AttendanceController',['$scope', '$http', function ($scope, $http) {
    console.log('hi, from attendance Controller');
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


app.controller('ChooseClassDatesController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from choose class dates Controller');

  $scope.classdates = [
    "Friday, January 15, 2016",
    "Friday, January 22, 2016",
    "Friday, January 29, 2016",
    "Friday, February 5, 2016",
    "Friday, February 12, 2016"
  ];

  //for (i=0; i<classdates.length; i++) {
  //  return classdates;
  //  console.log(classdates);
  //}

}]);

app.controller('ConfirmClassSignupController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from confirm class signup Controller');
  $scope.user = {};
  $scope.event = {};

  $scope.user.name = "Jane Doe";


  $scope.event.title = "Mom-to-Mom Group";
  $scope.event.dates = ["Tues Nov 5, 2015", "Thurs Dec 20, 2015", "Fri Dec 25, 2015"];

  $scope.confirmClass = function(userEvent) {
    console.log("this is the class registered for: ", userEvent);
    $scope.insertUsersEventSchedule(userEvent);

  };

  $scope.goBack = function() {
    console.log("I hit the go back button: ");
  };

  $scope.insertUsersEventSchedule = function(userEvent) {
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

app.controller('EditEventController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from edit event Controller');
}]);

app.controller('EventDetailsController',['$scope', '$http', "RegisterForClassFactory", "$location",
  function ($scope, $http, RegisterForClassFactory, $location) {

  console.log('hi, from event details controller Controller');
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
    //$location.path('/attendance);
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

app.controller('FindWalkinController',['$scope', '$http', function ($scope, $http) {
    console.log('hi, from Find Walkin Controller');
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

app.controller('LoginController',['$scope', '$http', '$location',
  function ($scope, $http, $location) {
  console.log('hi, from Login Controller');

  $scope.user = {};
  $scope.submitCredentials = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/login', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        console.log('response status', response.status);
        if (response.status===200){
          $location.path('/uicalendar');
        }
        else{
          // $location.path('/failure');
          alert('sign in failed');
        }

      });
  };

}]);

app.controller("ProfileController", ["$scope", "$http", function($scope, $http){
    $scope.user = {};
    $scope.tempUser = {};

    //test user data to populate form
    var testUser = {
        userId: 1
    };

    //get profile info for profile page
    $scope.getUser = function(someuser){
        console.log("the input of getUser: ",someuser);
        $http.get('/users/byUserId', {params: someuser}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
            $scope.tempUser = response.data[0];

            //define $scope.user
            $scope.user.firstName = $scope.tempUser.first_name;
            $scope.user.lastName = $scope.tempUser.last_name;
            $scope.user.userId = $scope.tempUser.user_id;
            $scope.user.userName = $scope.tempUser.user_name;
            $scope.user.password = $scope.tempUser.password;
            $scope.user.roleName = $scope.tempUser.role_name;
            $scope.user.roleId = $scope.tempUser.role_id;
            $scope.user.dateOfBirth = $scope.tempUser.date_of_birth;
            $scope.user.phoneNumber = $scope.tempUser.phone_number;
            $scope.user.emailAdress = $scope.tempUser.email_address;
            $scope.user.contactType = $scope.tempUser.contact_type;
            $scope.user.paymentType = $scope.tempUser.payment_type;
            $scope.user.everydayMiraclesClientInd = $scope.tempUser.everyday_miracles_client_ind;
            $scope.user.doulaName = $scope.tempUser.doula_name;
            $scope.user.expectedBirthDate = $scope.tempUser.expected_birth_date;

            console.log("the #scope.user: ", $scope.user);
        });
    };

    $scope.saveProfile = function(someuser) {

        console.log("Input to put /users ", someuser);
        $http.put('/users', someuser).then(function (response) {
            console.log("Output from put /users ", response.data);
        });
    };
    $scope.getUser(testUser);

}]);
app.controller('StudentClassListController', ["$scope", "$http", function($scope,$http){
    console.log("student class controller says hi");
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

        var eventSchedule = {eventScheduleId: 1};

        console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
        $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
            console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
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

}]);

app.controller('UiCalendarController', ["$scope", "$http", "RegisterForClassFactory", "$location",
    function($scope, $http, RegisterForClassFactory, $location) {
    console.log("hi from ui calendar controller");
    /* config object */
    $scope.tempEvents;
    $scope.eventSources = {};
    $scope.eventSources.events = [];
    $scope.uiConfig = {};
    $scope.registerForClassFactory = RegisterForClassFactory;
    //dateRange related variables
    $scope.today;
    $scope.previousMonth = 0;
    $scope.nextMonth = 0;
    $scope.startYear = 0;
    $scope.endYear = 0;

    //load the calendar
    $scope.loadCalendar = function() {

        //sets dateRange to the present month
        $scope.setDateRange = function() {
            $scope.today = new Date();
            $scope.previousMonth = $scope.today.getMonth();
            $scope.startYear = $scope.today.getFullYear();
            $scope.endYear = $scope.today.getFullYear();

            if ($scope.previousMonth == 11){
                $scope.nextMonth = 1;
                $scope.endYear += 1;
            } else if ($scope.previousMonth == 0){
                $scope.previousMonth = 12;
                $scope.startYear -= 1;
            } else {
                $scope.nextMonth = $scope.previousMonth+2;
            }



            //sets var dateRange
            $scope.dateRange = {
                startDate: $scope.startYear+'-'+$scope.previousMonth+'-'+'01',
                endDate: $scope.endYear+'-'+$scope.nextMonth+'-'+'31'
            };

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

                $scope.eventSources.events[i].start = $scope.tempEvents[i].start_datetime;
                $scope.eventSources.events[i].end = $scope.tempEvents[i].end_datetime;

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
                    height: 450,
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
            $scope.registerForClassFactory.setEvent(event);
            console.log("factory test: ", $scope.registerForClassFactory.getEvent());

            $location.path("/eventdetails");

        };
        $scope.alertEventOnClick = function(date, jsEvent, view) {
            console.log("this is the date: ",date);
            console.log("this is the jsEvent: ", jsEvent);
        };


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
