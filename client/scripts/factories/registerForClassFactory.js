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
      //return studentEvents;
    }
  };

  return eventApi;
}]);