app.factory("RegisterForClassFactory", ["$http", function($http){
    var event = {};

        var inputEvent = function(someevent){
            event = someevent;
            return event;
        };

    var eventApi = {
        setEvent: function(someevent) {
            return inputEvent(someevent);
        },
        getEvent: function(){
            return event;
        }
    };
    return eventApi;
}]);