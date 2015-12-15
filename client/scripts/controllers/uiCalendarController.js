app.controller('UiCalendarController', ["$scope", "$http", "CalendarFactory", function($scope, $http, CalendarFactory) {
    console.log("hi from ui calendar controller");
    /* config object */
    $scope.tempEvents;
    $scope.eventSources = {};
    $scope.eventSources.events = [];
    $scope.uiConfig = {};
    $scope.calendarFactory = CalendarFactory;

    //load the calendar
    $scope.loadCalendar = function() {

        //get the events to populate calendar
        $scope.calendarFactory.retrieveEvents().then(function() {
            $scope.tempEvents = $scope.calendarFactory.eventsData();
            console.log("tempEvents after the call: ", $scope.tempEvents);

            //loop through results from factory call to set event info into calendar
            for (var i = 0; i < $scope.tempEvents.length; i++) {
                $scope.eventSources.events[i] = {};
                $scope.eventSources.events[i].allDay = false;
                $scope.eventSources.events[i].title = $scope.tempEvents[i].title;

                $scope.eventSources.events[i].start = $scope.tempEvents[i].start_datetime;
                $scope.eventSources.events[i].end = $scope.tempEvents[i].end_datetime;

                //$scope.eventSources.events[i].description = $scope.tempEvents[i].description;

                //unique id for event
                //corresponds to property event_schedule_id in the database
                $scope.eventSources.events[i].id = $scope.tempEvents[i].event_schedule_id;

            }

            //uiConfigurations for experimentation
            $scope.uiConfig = {
                calendar:{
                    height: 450,
                    editable: true,
                    header:{
                        left: 'month basicWeek basicDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: $scope.alertEventOnClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventClick: $scope.eventClick
                }
            };

        });

        //functions
        $scope.eventClick = function(event, jsEvent, view){
            console.log("this is variable event: ", event);
            console.log("this is jsEvent: ",jsEvent);
            console.log("this is view: ", view);

        };
        $scope.alertEventOnClick = function(date, jsEvent, view) {
            console.log("this is the date: ",date);
            console.log("this is the jsEvent: ", jsEvent);
        };


    };


$scope.loadCalendar();

}]);

