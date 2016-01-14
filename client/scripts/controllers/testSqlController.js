app.controller('TestSqlController',['$scope', '$http', function ($scope, $http) {

    $scope.selectUsers = function() {
        var user = {userName: 'testuser1'};

        $http.get('/users/byUserName', {params: user}).then(function (response) {
        });

        var user2 = {
            firstName: 'test',
            lastName: '',
            phoneNumber: ''
        };

        $http.get('/users/byNameOrPhone', {params: user2}).then(function (response) {
        });

        var user1 = {
            userId: 1
        };

        $http.get('/users/byUserId', {params: user1}).then(function (response) {
        });

        $http.get('/users/roles').then(function (response) {
        });

        $http.get('/users/teachers').then(function (response) {
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

        $http.post('/users', insertuser).then(function (response) {
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

        $http.put('/users', updateUser).then(function (response) {
        });
    };

    $scope.deleteUsers = function() {

        var userId = 7;

        $http.delete('/users/delete'+ userId).then(function(response){
        });

    };

    $scope.selectEvent = function() {
        var event1 = {startDate: '2015-01-01',
                    endDate: '2015-12-31'};

        $http.get('/event/byDateRange', {params: event1}).then(function(response){
        });

        var event2 = {eventId: 1,
            eventScheduleId: 1};

        $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
        });

        var event3 = {eventId: 1};

        $http.get('/event/byEventId', {params: event3}).then(function(response){
        });

        $http.get('/event/categories').then(function (response) {
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

        $http.post('/event', event).then(function (response) {
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

        $http.put('/event', event).then(function (response) {
        });

    };

    $scope.deleteEvent = function() {

        var eventId = 3;

        $http.delete('/event/delete'+ eventId).then(function(response){
        });

    };

    $scope.selectEventSchedule = function() {

        var event = {eventId: 1};

        $http.get('/eventSchedule/byEventId', {params: event}).then(function(response){
        });

        var event2 = {eventId: 1};

        $http.get('/eventSchedule/currentByEventId', {params: event2}).then(function(response){
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

        $http.post('/eventSchedule', event).then(function (response) {
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

        $http.put('/eventSchedule', event).then(function (response) {
        });

    };

    $scope.deleteEventSchedule = function() {

        var eventScheduleId = 3;

        $http.delete('/eventSchedule/delete'+ eventScheduleId).then(function(response){
        });

    };

    $scope.selectUsersEventSchedule = function() {

        var user = {userId: 1};

        $http.get('/usersEventSchedule/byUserId', {params: user}).then(function(response){
        });

        var user2 = {userId: 1, eventId: 1};

        $http.get('/usersEventSchedule/byEventIdUserId', {params: user2}).then(function(response){
        });

        var eventSchedule = {eventScheduleId: 1};

        $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        });

        var usereventSchedule = {userId:1, eventScheduleId: 1};

        $http.get('/usersEventSchedule/byUserIdEventScheduleId', {params: usereventSchedule}).then(function(response){
        });

    };

    $scope.insertUsersEventSchedule = function() {
        var userEvent = {
            userId: 1,
            eventScheduleId: 2,
            status: 'registered',
            comments: 'this is a comment'
        };

        $http.post('/usersEventSchedule', userEvent).then(function (response) {
        });
    };

    $scope.updateUsersEventSchedule = function() {
        var userEvent = {
            userId: 1,
            eventScheduleId: 2,
            status: 'attended',
            comments: 'this is an updated comment'
        };

        $http.put('/usersEventSchedule', userEvent).then(function (response) {
        });

    };

    $scope.deleteUsersEventSchedule = function() {

        var event = {userId: 1,
                    eventScheduleId: 2};

        $http.get('/usersEventSchedule/delete', {params: event}).then(function(response){
        });
    };

    $scope.classCancelled = function() {
        var textMessage = {
            userId: "Dana",
            classTitle: '"Mom to mom" class',
            dateTime: 'Dec. 17th 6:00pm',
            comments: 'cancelled'
        };

        $http.get('/usersEventSchedule/classCancelled/data', {params: textMessage}).then(function(response){
        });

    };

    $scope.notifications = function() {
        var phoneNumber = ["6129783936", "6518906678"];

        var textMessage2 = {
            "phoneNumber[]": phoneNumber,
            message: "this is a test text message"
        };

        $http.get('/notifications/text', {params: textMessage2}).then(function(response){
        });

        var emailMessage = {
            "sendTo[]": ['jdrew5@hotmail.com', 'jason.tenbrink@gmail.com'],
            subject: "this is a subject",
            message: "this is a test email message"
        };

        $http.get('/notifications/email', {params: emailMessage}).then(function(response){
        });

    };

}]);
