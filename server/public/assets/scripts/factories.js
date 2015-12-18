app.factory("ActiveProfileFactory", ["$http", function($http){
  var user = new User();

  var publicApi = {
      setActiveProfileData: function(id) {
        user.userId = id;
        console.log('user: ', user);
          return user.user_id;
      },
      getActiveProfileData: function(){
        console.log("active user from factory, ", user);
          return user;
      }
  };

  return publicApi;
}]);

function User() {
  this.firstName = '';
  this.lastName = '';
  this.userId = '';
  this.userName = '';
  this.password = '';
  this.roleName = '';
  this.roleId = '';
  this.dateOfBirth = '';
  this.phoneNumber = '';
  this.emailAdress = '';
  this.contactType = '';
  this.paymentType = '';
  this.everydayMiraclesClientInd = '';
  this.doulaName = '';
  this.expectedBirthDate = '';
}

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
  var studevent = {};

  var inputEvent = function(someevent){
    event = someevent;
    return event;
  };

  var studentEvents = function(someevent){
    studevent = someevent;
    return studevent;
  };

  var eventApi = {
    setEvent: function(someevent) {
      return inputEvent(someevent);
    },
    getEvent: function(){
      return event;
    },
    setStudentEventDates: function(someevent){
      return studentEvents(someevent);
    },
    getStudentEventDates: function(){
      return studevent;
    }
  };

  return eventApi;
}]);