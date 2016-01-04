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
