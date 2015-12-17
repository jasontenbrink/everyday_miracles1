app.controller('AttendanceController',['$scope', '$http', 'RegisterForClassFactory', function ($scope, $http, RegisterForClassFactory) {

    $scope.registerForClassFactory = RegisterForClassFactory;

    //get event info from the registerForClassFactory
    //should be event info corresponding to event clicked on in calendar view
    $scope.eventFromFactory = $scope.registerForClassFactory.getEvent();

    console.log("scope.eventFromFactory: ",$scope.eventFromFactory);

    $scope.eventId = $scope.eventFromFactory.eventId;
    $scope.eventScheduleId = $scope.eventFromFactory.eventScheduleId;

    // get data from the database
    var eventSchedule = {eventScheduleId: $scope.eventScheduleId};
    console.log("Input to get /usersEventSchedule/byEventScheduleId ", eventSchedule);
    $http.get('/usersEventSchedule/byEventScheduleId', {params: eventSchedule}).then(function(response){
        console.log("Output from get /usersEventSchedule/byEventScheduleId ", response.data);
    });

}]);
