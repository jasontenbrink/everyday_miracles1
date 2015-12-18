app.factory("RegisterForClassFactory", ["$http", function($http){
  var event = {};
  var studentEvents = [];

  var inputEvent = function(someevent){
    event = someevent;
    return event;
  };

  var inputStudentEvents = function(someevents){
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
      return studentEvents;
    }
  };

  return eventApi;
}]);