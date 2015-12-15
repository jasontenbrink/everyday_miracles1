app.factory("CalendarFactory", ["$http", function($http){
   var events = undefined;

    var selectEvent = function() {
        var dateRange = {
            startDate: '2015-01-01',
            endDate: '2015-12-31'
        };

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