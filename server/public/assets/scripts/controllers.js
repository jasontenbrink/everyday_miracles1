app.controller('AddEventController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from add event Controller');
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

app.controller('EventDetailsController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from event details controller Controller');
  $scope.user = {};

  $scope.user.loginstatus = true;

  $scope.user.role = "student";

  //sample data in eventDate
  //can change it to be something else
  $scope.event = {
    start:"2015-12-05T14:00:00Z",
    end:"2015-12-05T15:00:00Z",
    title: "Mom-to-Mom Group",
    description: "Need a moment to stop, connect, and breathe? Free and on-going for expecting, new, and experienced mothers. This group, put on by The Nursing Nook, offers gentle yoga and meditation, mother-to-mother support, local breastfeeding resources, playdate for breastfeeding babes, monthly guest speakers. Childcare for older siblings may be available. Please pre-register."
  };

  //need the click stuff

  //get the event stuff from the server


  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

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

app.controller('LoginController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from Login Controller');

  $scope.user = {};

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

app.controller('UiCalendarController', ["$scope", "$http", function($scope, $http) {
    console.log("hi from ui calendar controller");
    /* config object */
    $scope.tempEvents;
    $scope.eventSources = {};
    $scope.eventSources.events = [];
    $scope.uiConfig = {};
    $scope.today;
    $scope.previousMonth = 0;
    $scope.nextMonth = 0;
    $scope.startYear = 0;
    $scope.endYear = 0;

    //$scope.calendarFactory = CalendarFactory;

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

            //loop through results from factory call to set event info into calendar
            for (var i = 0; i < $scope.tempEvents.length; i++) {
                $scope.eventSources.events[i] = {};
                $scope.eventSources.events[i].allDay = false;
                $scope.eventSources.events[i].title = $scope.tempEvents[i].title;

                $scope.eventSources.events[i].start = $scope.tempEvents[i].start_datetime;
                $scope.eventSources.events[i].end = $scope.tempEvents[i].end_datetime;

                //$scope.eventSources.events[i].description = $scope.tempEvents[i].description;

                //unique id for event
                //corresponds to property event_schedule_id in the database
                $scope.eventSources.events[i].id = $scope.tempEvents[i].event_schedule_id;

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
        $scope.eventClick = function(event, jsEvent, view){
            console.log("this is variable event: ", event);
            console.log("this is jsEvent: ",jsEvent);
            console.log("this is view: ", view);

        };
        $scope.alertEventOnClick = function(date, jsEvent, view) {
            console.log("this is the date: ",date);
            console.log("this is the jsEvent: ", jsEvent);
        };


    };


$scope.loadCalendar();

}]);

