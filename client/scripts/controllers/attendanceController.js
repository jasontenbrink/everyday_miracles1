app.controller('AttendanceController',['$scope', '$http', 'RegisterForClassFactory', function ($scope, $http, RegisterForClassFactory) {

    $scope.usersEventSchedule = [];
    $scope.event = {};

    $scope.registerForClassFactory = RegisterForClassFactory;

    //get event info from the registerForClassFactory
    //should be event info corresponding to event clicked on in calendar view
    $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

    console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

    $scope.eventId = $scope.eventFromFactory.eventId;
    $scope.eventScheduleId = $scope.eventFromFactory.eventScheduleId;

    var event2 = {eventId: 1,
        eventScheduleId: 1};

    console.log("Input to get /event/byEventIdEventScheduleId ", event2);
    $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
        console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
        $scope.event = response.data[0];
    });

    // get data from the database
    //var eventSchedule = {eventScheduleId: $scope.eventScheduleId};
    var eventSchedule = {eventScheduleId: 1};
    console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
    $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
        $scope.usersEventSchedule = response.data;
    });

    var status = "";
    $scope.submitAttendance = function() {
        for (var i = 0; i < $scope.usersEventSchedule.length; i++) {
            console.log($scope.usersEventSchedule[i].addCheckbox);
            console.log($scope.usersEventSchedule[i]);
            if ($scope.usersEventSchedule[i].addCheckbox) {
                status = "Attended";
            } else {
                status = "Not attended";
            }
            var userEvent = {
                userId: $scope.usersEventSchedule[i].user_id,
                eventScheduleId: $scope.usersEventSchedule[i].event_schedule_id,
                status: status,
                comments: ''
            };

            console.log("Input to update /usersEventSchedule ", userEvent);
            $http.put('/usersEventSchedule', userEvent).then(function (response) {
                console.log("Output from update /usersEventSchedule ", response.data);
            });

        }
    }

}]);
