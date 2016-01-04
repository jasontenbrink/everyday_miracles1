app.controller('UiCalendarController', ["$scope", "$http", "RegisterForClassFactory", "$location", "$localstorage",
    function($scope, $http, RegisterForClassFactory, $location, $localstorage) {
    console.log("hi from ui calendar controller");
    /* config object */
    $scope.tempEvents;
    $scope.eventSources = {};
    $scope.eventSources.events = [];
    $scope.uiConfig = {};
    $scope.registerForClassFactory = RegisterForClassFactory;

    //load the calendar
    $scope.loadCalendar = function() {

        //sets dateRange from the previous month to the following month
        $scope.setDateRange = function() {
            $scope.today = new Date();

            $scope.month = $scope.today.getMonth();
            $scope.year = $scope.today.getFullYear();


            // the 0th day of the next month returns the last day of this month

            $scope.dateRange = {
                startDate: new Date($scope.year, $scope.month, 1),
                endDate: new Date($scope.year, $scope.month + 1, 0)
            };

            console.log("date range ", $scope.dateRange);

        };

        $scope.setDateRange();

        //get the events to populate calendar
        $http.get('/event/byDateRange', {params: $scope.dateRange}).then(function (response) {
            console.log("Output from get /event/byDateRange ", response.data);
            $scope.tempEvents = response.data;
            console.log("the tempEvents", $scope.tempEvents);
            //loop through results from factory call to set event info into calendar
            for (var i = 0; i < $scope.tempEvents.length; i++) {
                $scope.eventSources.events[i] = {};
                $scope.eventSources.events[i].allDay = false;
                $scope.eventSources.events[i].title = $scope.tempEvents[i].title;

                $scope.eventSources.events[i].start = $scope.tempEvents[i].start_datetime;
                $scope.eventSources.events[i].end = $scope.tempEvents[i].end_datetime;

                //$scope.eventSources.events[i].description = $scope.tempEvents[i].description;

                //unique id for a event
                //corresponds to property event_schedule_id in the database
                //use this to get information like attendance about a particular class
                $scope.eventSources.events[i].eventScheduleId = $scope.tempEvents[i].event_schedule_id;

                //sets event id
                //use this to get multiple dates for the same event from the database
                $scope.eventSources.events[i].eventId = $scope.tempEvents[i].event_id;

            }

            //uiConfigurations for experimentation
            $scope.uiConfig = {
                calendar:{
                    height: 600,
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
        //saves the unique id of the clicked on class
        $scope.eventClick = function(event, jsEvent, view){

            console.log("this is event: ",event);
            $scope.registerForClassFactory.setEvent(event);
            console.log("factory test: ", $scope.registerForClassFactory.getEvent());

            $location.path("/eventdetails");

        };
        $scope.alertEventOnClick = function(date, jsEvent, view) {
            console.log("this is the date: ",date);
            console.log("this is the jsEvent: ", jsEvent);

            $localstorage.set('eventId', null);
            $localstorage.set('eventDate', date.format());
            $localstorage.set('eventInsertBoolean', true);
            $location.path('/addevent');
        };


    };


$scope.loadCalendar();

}]);

