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