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
