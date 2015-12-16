app.factory("RegisterForClassFactory", ["$http", function($http){
    var event = {};

        var inputEventIds = function(uniqueid, eventid){
            event.eventScheduleId = uniqueid;
            event.eventId = eventid;
            return event;
        };

    var eventApi = {
        setEventIds: function(uniqueid, eventid) {
            return inputEventIds(uniqueid, eventid);
        },
        getEvent: function(){
            return event;
        }
    };
    return eventApi;
}]);