app.controller('FindWalkinController',['$scope', '$http', 'RegisterForClassFactory', '$location',
    function ($scope, $http, RegisterForClassFactory, $location) {

        $scope.usersEventSchedule = [];
        $scope.event = {};
        $scope.user = {};
        $scope.foundUser = [];

        $scope.registerForClassFactory = RegisterForClassFactory;

        //get event info from the registerForClassFactory
        //should be event info corresponding to event clicked on in calendar view
        $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

        console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

        $scope.eventId = $scope.eventFromFactory.eventId;
        $scope.eventScheduleId = $scope.eventFromFactory.eventScheduleId;

        $scope.findWalkin = function() {

            console.log("Input to get /users/byNameOrPhone ", $scope.user);
            $http.get('/users/byNameOrPhone', {params: $scope.user}).then(function (response) {
                console.log("Output from get /users/byNameOrPhone ", response.data);
                $scope.foundUser = response.data[0];
            });
        }

        $scope.submitUser = function() {
            console.log("submitting user ", $scope.foundUser);

            //insert into database
            var userEvent = {
                userId: $scope.foundUser.user_id,
                eventScheduleId: $scope.eventScheduleId,
                status: 'Attended',
                comments: ''
            };

            console.log("Input to post /usersEventSchedule ", userEvent);
            $http.post('/usersEventSchedule', userEvent).then(function (response) {
                console.log("Output from post /usersEventSchedule ", response.data);
                // go back to attendance page
                if(response.data==true){
                    alert("Student submitted as attended.");
                    $location.path('/attendance');
                }
            });

        }

        $scope.newUser = function() {
            $location.path('/addwalkin');
        }


}]);
