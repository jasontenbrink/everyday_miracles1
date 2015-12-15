app.controller('AddEventController',['$scope', '$http', function ($scope, $http) {

  $scope.insertMode = false;
  $scope.event.eventId = 1;

  $scope.event = {};
  $scope.eventSchedule = [];

  $scope.submitEvent = function() {
    var event = {
      eventId: $scope.event.eventId,
      title: $scope.event.title,
      description: $scope.event.description,
      eventCategoryId: $scope.event.eventCategoryId,
      repeatType: $scope.event.repeatType,
      repeatFromDate: $scope.event.repeatFromDate,
      repeatToDate: $scope.event.repeatToDate,
      repeatSundayInd: $scope.event.repeatSundayInd,
      repeatMondayInd: $scope.event.repeatMondayInd,
      repeatTuesdayInd: $scope.event.repeatTuesdayInd,
      repeatWednesdayInd: $scope.event.repeatWednesdayInd,
      repeatThursdayInd: $scope.event.repeatThursdayInd,
      repeatFridayInd: $scope.event.repeatFridayInd,
      repeatSaturdayInd: $scope.event.repeatSaturdayInd
    };

    if ($scope.insertMode) {
      // insert data
      console.log("Input to post /event ", event);
      $http.post('/event', event).then(function (response) {
        console.log("Output from post /event ", response.data);
        $scope.event.eventId = response.data.rows[0].event_id;
        $scope.insertMode = false;
      });
    } else {
      // update data
      console.log("Input to update /event ", event);
      $http.put('/event', event).then(function (response) {
        console.log("Output from update /event ", response.data);
      });
    }
  };

  $scope.gridOptions = {
    columnDefs : [
      { name: 'eventScheduleId', displayName: 'Event Schedule ID'},
      { name: 'eventId', displayName: 'Event ID'},
      { name: 'scheduleDate', displayName: 'Schedule Date' },
      { name: 'teacherUserId', displayName: 'Teacher User Id' },
      { name: 'startDateTime', displayName: 'Start Date Time'},
      { name: 'endDateTime', displayName: 'End Date Time'},
      {name: 'Action',
        cellEditableCondition: false,
        cellTemplate: '<button ng-click="grid.appScope.deleteEventSchedule(row.entity)" ' +
        'class="md-raised md-primary">Delete</button>' }],
    data: $scope.eventSchedule
  };

  $scope.selectEventSchedule = function() {

  }

}]);
