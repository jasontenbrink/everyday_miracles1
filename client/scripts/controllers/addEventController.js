app.controller('AddEventController',['$scope', '$http', function ($scope, $http) {

  $scope.insertMode = false;

  $scope.event = {};
  $scope.eventSchedule = [];
  $scope.gridOptions = {};

  $scope.eventScheduleAdd = {};

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

  $scope.loadEventData = function() {
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
      $scope.event.repeatFromDate = new Date(response.data[0].repeat_from_date);
      $scope.event.repeatToDate = new Date(response.data[0].repeat_to_date);
      $scope.event.repeatSundayInd = response.data[0].repeat_sunday_ind;
      $scope.event.repeatMondayInd = response.data[0].repeat_monday_ind;
      $scope.event.repeatTuesdayInd = response.data[0].repeat_tuesday_ind;
      $scope.event.repeatWednesdayInd = response.data[0].repeat_wednesday_ind;
      $scope.event.repeatThursdayInd = response.data[0].repeat_thursday_ind;
      $scope.event.repeatFridayInd = response.data[0].repeat_friday_ind;
      $scope.event.repeatSaturdayInd = response.data[0].repeat_saturday_ind;

      $scope.loadEventScheduleData();
    });


  }

  if (!$scope.insertMode) {
    $scope.loadEventData();
  }

  $scope.loadEventScheduleData = function() {
    var passingEvent = {eventId: $scope.event.eventId};
    // load up the event schedule grid
    console.log("Input to get /eventSchedule/byEventId ", passingEvent);
    $http.get('/eventSchedule/byEventId', {params: passingEvent}).then(function(response){
      console.log("Output from get /eventSchedule/byEventId ", response.data);
      $scope.eventSchedule = response.data;

      $scope.gridOptions = {
        columnDefs : [
          { name: 'event_schedule_id', displayName: 'Event Schedule ID'},
          { name: 'event_id', displayName: 'Event ID'},
          { name: 'schedule_date', cellFilter:"date: 'fullDate':'-1200'", displayName: 'Schedule Date' },
          { name: 'teacher_user_id', displayName: 'Teacher User Id' },
          { name: 'start_datetime', cellFilter:"date: 'shortTime':'-1200'", displayName: 'Start Time'},
          { name: 'end_datetime', cellFilter:"date: 'shortTime':'-1200'", displayName: 'End Time'},
          {name: 'Action',
            cellEditableCondition: false,
            cellTemplate: '<button ng-click="grid.appScope.deleteEventSchedule(row.entity)" ' +
            'class="md-raised md-primary">Delete</button>' }],
        data: $scope.eventSchedule
      };

    });
  }

  $scope.submitEventSchedule = function() {

    var month = new Date($scope.eventScheduleAdd.scheduleDate).getMonth();
    var day = new Date($scope.eventScheduleAdd.scheduleDate).getDate();
    var year = new Date($scope.eventScheduleAdd.scheduleDate).getFullYear();

    var startHours = new Date($scope.eventScheduleAdd.startDateTime).getHours();
    var startMinutes = new Date($scope.eventScheduleAdd.startDateTime).getMinutes();

    var endHours = new Date($scope.eventScheduleAdd.endDateTime).getHours();
    var endMinutes = new Date($scope.eventScheduleAdd.endDateTime).getMinutes();

    var startDateTime = new Date(year, month, day, startHours, startMinutes, 0);
    var endDateTime = new Date(year, month, day, endHours, endMinutes, 0)

    console.log("start date ", startDateTime, " end date ", endDateTime );

    var repeatType = $scope.event.repeatType;
    var repeat = true;

    while (repeat){
      //do an insert always

      // if repeat type = none
      // repeat = false
      // if repeat type = daily
      // add 1 to the date
      // if repeat type = weekly
      // add 7 to the date
      // if repeat type = monthly
      // add 1 to the month
      // if new date >= repeatToDate
      // repeat = false

    }

      //var addEventSchedule = {
      //  eventId: $scope.event.eventId,
      //  scheduleDate: $scope.eventScheduleAdd.scheduleDate,
      //  startDateTime: startDateTime,
      //  endDateTime: endDateTime,
      //  teacherUserId: $scope.eventScheduleAdd.teacherUserId
      //};
      //
      //console.log("Input to post /eventSchedule ", addEventSchedule);
      //$http.post('/eventSchedule', addEventSchedule).then(function (response) {
      //  console.log("Output from post /eventSchedule ", response.data);
      //  $scope.loadEventScheduleData();
      //});
  }

  $scope.deleteEventSchedule = function(deleteObject) {
    console.log("object ", deleteObject);

    var answer = confirm("Are you sure you want to delete event schedule id " + deleteObject.event_schedule_id + "?")
    if (answer){
      $http.delete('/eventSchedule/delete'+ deleteObject.event_schedule_id).then(function(response){
        $scope.loadEventScheduleData();
      });
    }
    else {
      // do nothing
    }
  }

}]);
