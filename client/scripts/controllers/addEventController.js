app.controller('AddEventController',['$scope', '$http', '$localstorage', function ($scope, $http, $localstorage) {

  $scope.event = {};
  $scope.eventSchedule = [];
  $scope.gridOptions = {};
  $scope.teachers = [];
  $scope.categories = [];

  $scope.eventScheduleAdd = {};

  $scope.eventInsertBoolean = $localstorage.get('eventInsertBoolean');
  $scope.event.eventId = $localstorage.get('eventId');


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

    if ($scope.eventInsertBoolean=='true') {
      // insert data
      $http.post('/event', event).then(function (response) {
        $scope.event.eventId = response.data.rows[0].event_id;
        $scope.eventInsertBoolean = false;

        $localstorage.set('eventId', $scope.event.eventId);
        $localstorage.set('eventInsertBoolean', $scope.eventInsertBoolean);

      });
    } else {
      // update data
      $http.put('/event', event).then(function (response) {
      });
    }
  };

  $scope.loadEventData = function() {
    var passingEvent = {eventId: $scope.event.eventId};

    $http.get('/event/byEventId', {params: passingEvent}).then(function(response){
      // Set scope values
      $scope.event.eventId = response.data[0].event_id;
      $scope.event.title = response.data[0].title;
      $scope.event.description = response.data[0].description;
      $scope.event.eventCategoryId = response.data[0].event_category_id;
      $scope.event.repeatType = response.data[0].repeat_type;
      $scope.event.repeatFromDate = response.data[0].repeat_from_date;
      $scope.event.repeatToDate = response.data[0].repeat_to_date;
      $scope.event.repeatSundayInd = response.data[0].repeat_sunday_ind;
      $scope.event.repeatMondayInd = response.data[0].repeat_monday_ind;
      $scope.event.repeatTuesdayInd = response.data[0].repeat_tuesday_ind;
      $scope.event.repeatWednesdayInd = response.data[0].repeat_wednesday_ind;
      $scope.event.repeatThursdayInd = response.data[0].repeat_thursday_ind;
      $scope.event.repeatFridayInd = response.data[0].repeat_friday_ind;
      $scope.event.repeatSaturdayInd = response.data[0].repeat_saturday_ind;

      if ($scope.event.repeatFromDate !== null) {
        $scope.event.repeatFromDate = new Date($scope.event.repeatFromDate);
      }
      if ($scope.event.repeatToDate !== null) {
        $scope.event.repeatToDate = new Date($scope.event.repeatToDate);
      }

      $scope.loadEventScheduleData();
    });
  };

  if ($scope.eventInsertBoolean=='false') {
    $scope.loadEventData();
  } else {
    // set the schedule date
    //$scope.eventScheduleAdd.scheduleDate = new Date($localstorage.get('eventDate'));
  }

  $scope.loadEventScheduleData = function() {
    var passingEvent = {eventId: $scope.event.eventId};
    // load up the event schedule grid
    $http.get('/eventSchedule/byEventId', {params: passingEvent}).then(function(response){
      $scope.eventSchedule = response.data;

      for (var i = 0; i < $scope.eventSchedule.length; i++) {
        $scope.eventSchedule[i].schedule_date = new Date($scope.eventSchedule[i].schedule_date);
      }

      $scope.gridOptions = {
        columnDefs : [
          { name: 'event_schedule_id', displayName: 'Event Schedule ID', width:"10%", visible:false},
          { name: 'event_id', displayName: 'Event ID', width:"10%", visible:false},
          { name: 'schedule_date', cellFilter:"date: 'EEEE, MMMM d, y'", displayName: 'Schedule Date', width:"20%"},
          { name: 'teacher_name', displayName: 'Teacher Name', width:"20%"},
          { name: 'start_datetime', cellFilter:"date: 'shortTime'", displayName: 'Start Time', width:"10%"},
          { name: 'end_datetime', cellFilter:"date: 'shortTime'", displayName: 'End Time', width:"10%"},
          {name: 'Action', width:"10%",
            cellEditableCondition: false,
            cellTemplate: '<button ng-click="grid.appScope.deleteEventSchedule(row.entity)" class="ui-grid-button">Delete</button>' }],
        data: $scope.eventSchedule
      };
    });
  };

  // load up teacher drop down
  $http.get('/users/teachers').then(function (response) {
    $scope.teachers = response.data;
  });

  // load up category drop down
  $http.get('/event/categories').then(function (response) {
    $scope.categories = response.data;
  });

  $scope.submitEventSchedule = function() {

    var addEventScheduleArray = [];

    var month = new Date($scope.eventScheduleAdd.scheduleDate).getMonth();
    var day = new Date($scope.eventScheduleAdd.scheduleDate).getDate();
    var year = new Date($scope.eventScheduleAdd.scheduleDate).getFullYear();

    var startHours = new Date($scope.eventScheduleAdd.startDateTime).getHours();
    var startMinutes = new Date($scope.eventScheduleAdd.startDateTime).getMinutes();

    var endHours = new Date($scope.eventScheduleAdd.endDateTime).getHours();
    var endMinutes = new Date($scope.eventScheduleAdd.endDateTime).getMinutes();

    var startDateTime = new Date(year, month, day, startHours, startMinutes, 0);
    var endDateTime = new Date(year, month, day, endHours, endMinutes, 0);


    var repeatType = $scope.event.repeatType;
    var repeatBoolean = true;
    var insertDate = $scope.eventScheduleAdd.scheduleDate;

    do {

      addEventScheduleArray.push({
        eventId: $scope.event.eventId,
        scheduleDate: new Date(insertDate),
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        teacherUserId: $scope.eventScheduleAdd.teacherUserId
      });

      if (repeatType == "None") {
        repeatBoolean = false;
      } else if (repeatType == "Daily") {
        insertDate = new Date(moment(insertDate).add(1, 'days'));
        startDateTime = new Date(moment(startDateTime).add(1, 'days'));
        endDateTime = new Date(moment(endDateTime).add(1, 'days'));
      } else if (repeatType == "Weekly") {
        insertDate = new Date(moment(insertDate).add(1, 'weeks'));
        startDateTime = new Date(moment(startDateTime).add(1, 'weeks'));
        endDateTime = new Date(moment(endDateTime).add(1, 'weeks'));
      } else if (repeatType == "Monthly") {
        insertDate = new Date(moment(insertDate).add(1, 'months'));
        startDateTime = new Date(moment(startDateTime).add(1, 'months'));
        endDateTime = new Date(moment(endDateTime).add(1, 'months'));
      } else {
        repeatBoolean = false;
      }

      if (insertDate > $scope.event.repeatToDate) {
        repeatBoolean = false;
      }

    } while (repeatBoolean);

    //do an insert always
    $http.post('/eventSchedule', addEventScheduleArray).then(function (response) {
      $scope.loadEventScheduleData();
    });
  };

  $scope.deleteEventSchedule = function(deleteObject) {

    var answer = confirm("Are you sure you want to delete event schedule id " + deleteObject.event_schedule_id + "?");
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
