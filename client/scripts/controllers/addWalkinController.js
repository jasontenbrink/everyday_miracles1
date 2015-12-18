app.controller('AddWalkinController',['$scope', '$http', 'RegisterForClassFactory', '$location',
    function ($scope, $http, RegisterForClassFactory, $location) {

        $scope.usersEventSchedule = [];
        $scope.event = {};
        $scope.user = {};

        $scope.registerForClassFactory = RegisterForClassFactory;

        //get event info from the registerForClassFactory
        //should be event info corresponding to event clicked on in calendar view
        $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

        console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

        $scope.eventId = $scope.eventFromFactory.eventId;
        $scope.eventScheduleId = $scope.eventFromFactory.eventScheduleId;


        $scope.addWalkin = function() {
            var insertuser = {
                userName: '',
                password: '',
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                roleId: 1,
                dateOfBirth: $scope.user.dateOfBirth,
                phoneNumber: $scope.user.phoneNumber,
                emailAddress: '',
                contactType: '',
                paymentType: $scope.user.paymentType,
                everydayMiraclesClientInd: false,
                doulaName: '',
                expectedBirthDate: ''
            };

            console.log("Input to post /users ", insertuser);
            $http.post('/users', insertuser).then(function (response) {
                console.log("Output from post /users ", response.data);

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
            });

        }

    }]);
