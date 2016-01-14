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

        var promise = $http.get('/event/byDateRange', {params: dateRange}).then(function (response) {

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