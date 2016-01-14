app.factory("ActiveProfileFactory", ["$http", function($http){
  var profile = new User();
  var loggedInUser = new User();

  var publicApi = {
      setActiveProfileData: function(id) {
        profile.userId = id;
          return profile.user_id;
      },
      getActiveProfileData: function(){

          return profile;
      },
      setLoggedInUserToActiveProfile: function () {
        profile = loggedInUser;
      },
      setLoggedInUser: function (id) {
        loggedInUser.userId = id;
      },
      getLoggedInUser: function () {
        return loggedInUser;
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

app.factory("AuthenticationRedirectInjector", ['$location', function($location){
var authenticationRedirect = {
          responseError: function (response) {

            if (response.status===401){
              $location.path('/login');
            }
          }
        };
return authenticationRedirect;
}]);

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
app.factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    };
}]);

app.factory("RegisterForClassFactory", ["$http", "$localstorage", function($http, $localstorage){
  var event = {};
  var studentEvents = [];

  var inputEvent = function(someevent){
    event = someevent;
    return event;
  };

  var inputStudentEvents = function(someevents){
    $localstorage.setObject("studentEvents", someevents);
    studentEvents = someevents;
    return studentEvents;
  };

  var eventApi = {
    setEvent: function(someevent) {
      return inputEvent(someevent);
    },
    getEvent: function(){
      return event;
    },
    setStudentEvents: function(someevents){
      return inputStudentEvents(someevents);
    },
    getStudentEvents: function(){
      return $localstorage.getObject("studentEvents");

    }
  };

  return eventApi;
}]);