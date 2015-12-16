app.factory("CalendarFactory", ["$http", function($http){
   var events = undefined;
    var dateRange = {};

    var selectEvent = function() {

        //sets dateRange to the present month
        var setDateRange = function() {
            var today = new Date();
            var todayMonth = today.getMonth();
            todayMonth++;
            var todayYear = today.getFullYear();

            //sets var dateRange
            dateRange = {
                startDate: todayYear+'-'+todayMonth+'-'+'01',
                endDate: todayYear+'-'+todayMonth+'-'+'31'
            };

        };

        setDateRange();
        console.log("Input to get /event/byDateRange ", dateRange);
        var promise = $http.get('/event/byDateRange', {params: dateRange}).then(function (response) {
            console.log("Output from get /event/byDateRange ", response.data);
            events = response.data;
        });
        return promise;

    };
    var publicApi = {
        retrieveEvents: function(){
            return selectEvent();
        },

        eventsData: function(){
            return events;
        }

    };

    return publicApi;
}]);
app.factory("RegisterForClassFactory", ["$http", function($http){
    var event = {};

        var inputEventIds = function(uniqueid, eventid){
            event.id = uniqueid;
            event.eventid = eventid;
            return event;
        };

    var eventApi = {
        setEventIds: function(uniqueid, eventid) {
            return inputEventIds(uniqueid, eventid);
        },
        getEventIds: function(){
            return event;
        }
    };
    return eventApi;
}]);