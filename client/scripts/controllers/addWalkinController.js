app.controller('AddWalkinController',['$scope', '$http', '$localstorage', '$location',
    function ($scope, $http, $localstorage, $location) {

        $scope.usersEventSchedule = [];
        $scope.event = {};
        $scope.user = {};

        $scope.eventId = $localstorage.get('eventId');
        $scope.eventScheduleId = $localstorage.get('eventScheduleId');

        var event2 = {eventId: $scope.eventId,
            eventScheduleId: $scope.eventScheduleId};

        $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
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

            $http.post('/users', insertuser).then(function (response) {

                if (response.data.rows[0].user_id) {
                    // insert into users event schedule
                    var userEvent = {
                        userId: response.data.rows[0].user_id,
                        eventScheduleId: $scope.eventScheduleId,
                        status: 'Attended',
                        comments: ''
                    };

                    $http.post('/usersEventSchedule', userEvent).then(function (response) {
                        alert("Created student.  Redirecting to Attendance.");
                        $location.path('/attendance');
                    });
                }
            });

        }

    }]);
