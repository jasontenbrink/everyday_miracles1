app.controller('UiCalendarController', ["$scope", "$http", "RegisterForClassFactory", "$location", "$localstorage",
    function($scope, $http, RegisterForClassFactory, $location, $localstorage) {

    /* config object */
    $scope.tempEvents;
    $scope.eventSources = {};
    $scope.eventSources.events = [];
    $scope.uiConfig = {};
    $scope.registerForClassFactory = RegisterForClassFactory;

    //load the calendar
    $scope.loadCalendar = function(){
        //sets dateRange to the present month
        $scope.setDateRange = function() {
            $scope.today = new Date();

            $scope.month = $scope.today.getMonth();
            $scope.year = $scope.today.getFullYear();




            $scope.dateRange = {
                startDate: new Date($scope.year - 1, $scope.month, 1),
                endDate: new Date($scope.year + 1, $scope.month + 1, 0)
            };



        };

        $scope.setDateRange();

        //get the events to populate calendar
        $http.get('/event/byDateRange', {params: $scope.dateRange}).then(function (response) {

            $scope.tempEvents = response.data;

            //loop through results from factory call to set event info into calendar
            for (var i = 0; i < $scope.tempEvents.length; i++) {
                $scope.eventSources.events[i] = {};
                $scope.eventSources.events[i].allDay = false;
                $scope.eventSources.events[i].title = $scope.tempEvents[i].title;

                $scope.eventSources.events[i].start = new Date($scope.tempEvents[i].start_datetime);
                $scope.eventSources.events[i].end = new Date($scope.tempEvents[i].end_datetime);

                // set class name to modify color in css calendarColor1, calendarColor2, etc
                $scope.eventSources.events[i].className = 'calendarColor' + $scope.tempEvents[i].event_category_id;

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


            //$scope.registerForClassFactory.setEvent(event);
            $localstorage.set("eventId", event.eventId);
            $localstorage.set("eventScheduleId", event.eventScheduleId);


            $location.path("/eventdetails");

        };

    };

$scope.loadCalendar();

}]);

