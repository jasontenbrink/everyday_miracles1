app.controller('AttendanceController',['$scope', '$http', '$localstorage', '$location', '$window',
    function ($scope, $http, $localstorage, $location, $window) {

    $scope.usersEventSchedule = [];
    $scope.event = {};

    $scope.eventId = $localstorage.get('eventId');
    $scope.eventScheduleId = $localstorage.get('eventScheduleId');

    var event2 = {eventId: $scope.eventId,
        eventScheduleId: $scope.eventScheduleId};

    $http.get('/event/byEventIdEventScheduleId', {params: event2}).then(function(response){
        $scope.event = response.data[0];
    });

    // get data from the database
    var eventSchedule = {eventScheduleId: $scope.eventScheduleId};

    $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        $scope.usersEventSchedule = response.data;
    });

    $scope.submitAttendance = function() {
        for (var i = 0; i < $scope.usersEventSchedule.length; i++) {

            if ($scope.usersEventSchedule[i].changed) {

                var userEvent = {
                    userId: $scope.usersEventSchedule[i].user_id,
                    eventScheduleId: $scope.usersEventSchedule[i].event_schedule_id,
                    status: $scope.usersEventSchedule[i].status,
                    comments: ''
                };

                $http.put('/usersEventSchedule', userEvent).then(function (response) {
                    if (response.data){
                      $window.alert('Attendance submitted');
                    }
                });
                $scope.usersEventSchedule[i].changed = false;
            }
        }
    };

    $scope.findWalkin = function() {
        $location.path('/findwalkin');
    }

}]);
