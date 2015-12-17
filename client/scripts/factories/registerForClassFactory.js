app.factory("RegisterForClassFactory", ["$http", function($http){
  var event = {};

    var inputEvent = function(someevent){
      event = someevent;
      return event;
    };

  var studentEventDates = {
    setStudentEventDates: function(someevent){
      studentEvents = someevent;
      return studentEvents;
    },
    getStudentEventDates: function(){
      return studentEvents;
    }
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