app.controller('FindWalkinController',['$scope', '$http', '$localstorage', '$location',
    function ($scope, $http, $localstorage, $location) {

        $scope.usersEventSchedule = [];
        $scope.event = {};
        $scope.user = {};
        $scope.foundUser = [];

        $scope.user.firstName = "";
        $scope.user.lastName = "";

        $scope.eventId = $localstorage.get('eventId');
        $scope.eventScheduleId = $localstorage.get('eventScheduleId');

        var event2 = {eventId: $scope.eventId,
            eventScheduleId: $scope.eventScheduleId};

        $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
            $scope.event = response.data[0];
        });

        $scope.findWalkin = function() {

            $http.get('/users/byNameOrPhone', {params: $scope.user}).then(function (response) {
                $scope.foundUser = response.data[0];
                if ($scope.foundUser.expected_birth_date != null) {
                    $scope.foundUser.expected_birth_date = new Date($scope.foundUser.expected_birth_date);
                }
            });
        };

        $scope.submitUser = function() {

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
            $http.put('/users', updateUser).then(function (response) {
            });

            //insert into database
            var userEvent = {
                userId: $scope.foundUser.user_id,
                eventScheduleId: $scope.eventScheduleId,
                status: 'Attended',
                comments: ''
            };

            // see if the user is already in the class
            $http.get('/usersEventSchedule/byUserIdEventScheduleId', {params: userEvent}).then(function(response){
                if(response.data.length > 0) {
                    alert("Student already in the class.");
                } else {
                    // insert into user event schedule table
                    $http.post('/usersEventSchedule', userEvent).then(function (response) {
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
