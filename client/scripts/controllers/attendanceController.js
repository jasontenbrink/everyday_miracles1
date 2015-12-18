app.controller('AttendanceController',['$scope', '$http', 'RegisterForClassFactory', '$location',
    function ($scope, $http, RegisterForClassFactory, $location) {

    $scope.usersEventSchedule = [];
    $scope.event = {};

    $scope.registerForClassFactory = RegisterForClassFactory;

    //get event info from the registerForClassFactory
    //should be event info corresponding to event clicked on in calendar view
    $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

    console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

    $scope.eventId = $scope.eventFromFactory.eventId;
    $scope.eventScheduleId = $scope.eventFromFactory.eventScheduleId;

    var event2 = {eventId: $scope.eventId,
        eventScheduleId: $scope.eventScheduleId};

    console.log("Input to get /event/byEventIdEventScheduleId ", event2);
    $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
        console.log("Output from get /event/byEventIdEventScheduleId ", response.data);
        $scope.event = response.data[0];
    });

    // get data from the database
    var eventSchedule = {eventScheduleId: $scope.eventScheduleId};

    console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
    $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        //console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
        $scope.usersEventSchedule = response.data;
        console.log("userseventschedule ", $scope.usersEventSchedule);
    });

    $scope.submitAttendance = function() {
        for (var i = 0; i < $scope.usersEventSchedule.length; i++) {

            console.log("changed ", $scope.usersEventSchedule[i].changed);
            if ($scope.usersEventSchedule[i].changed) {

                var userEvent = {
                    userId: $scope.usersEventSchedule[i].user_id,
                    eventScheduleId: $scope.usersEventSchedule[i].event_schedule_id,
                    status: $scope.usersEventSchedule[i].status,
                    comments: ''
                };

                console.log("Input to update /usersEventSchedule ", userEvent);
                $http.put('/usersEventSchedule', userEvent).then(function (response) {
                    console.log("Output from update /usersEventSchedule ", response.data);
                });
                $scope.usersEventSchedule[i].changed = false;
            }
        }
    }

    $scope.findWalkin = function() {
        $location.path('/findwalkin');
    }

}]);
