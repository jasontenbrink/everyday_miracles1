app.controller('AddEventController',['$scope', '$http', function ($scope, $http) {

  $scope.insertMode = false;


  $scope.event = {};
  $scope.eventSchedule = [];

  $scope.event.eventId = 1;

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

  $scope.loadData = function() {
    var passingEvent = {eventId: $scope.event.eventId};

    console.log("Input to get /event/byEventId ", passingEvent);
    $http.get('/event/byEventId', {params: passingEvent}).then(function(response){
      console.log("Output from get /event/byEventId ", response.data);
      // Set scope values
      $scope.event.eventId = response.data[0].event_id;
      $scope.event.title = response.data[0].title;
      $scope.event.description = response.data[0].description;
      $scope.event.eventCategoryId = response.data[0].event_category_id;
      $scope.event.repeatType = response.data[0].repeat_type;
      $scope.event.repeatSundayInd = response.data[0].repeat_sunday_ind;
      $scope.event.repeatMondayInd = response.data[0].repeat_monday_ind;
      $scope.event.repeatTuesdayInd = response.data[0].repeat_tuesday_ind;
      $scope.event.repeatWednesdayInd = response.data[0].repeat_wednesday_ind;
      $scope.event.repeatThursdayInd = response.data[0].repeat_thursday_ind;
      $scope.event.repeatFridayInd = response.data[0].repeat_friday_ind;
      $scope.event.repeatSaturdayInd = response.data[0].repeat_saturday_ind;

    });
  }

  if (!$scope.insertMode) {
    $scope.loadData();
  }

}]);
