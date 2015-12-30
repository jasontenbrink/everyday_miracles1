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
