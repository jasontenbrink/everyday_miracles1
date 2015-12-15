app.factory("CalendarFactory", ["$http", function($http){
   var events = undefined;
    var dateRange = {};

    var selectEvent = function() {

        //var dateRange = {
        //    startDate: '2015-01-01',
        //    endDate: '2015-12-31'
        //};

        var getMonth = function() {
            var today = new Date();
            var todayMonth = today.getMonth();
            todayMonth++;
            var todayYear = today.getFullYear();

            dateRange = {
                startDate: todayYear+'-'+todayMonth+'-'+'01',
                endDate: todayYear+'-'+todayMonth+'-'+'31'
            };

        };

        getMonth();
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