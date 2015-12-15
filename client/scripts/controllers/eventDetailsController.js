app.controller('EventDetailsController',['$scope', '$http', function ($scope, $http) {

  console.log('hi, from event details controller Controller');
  $scope.user = {};

  $scope.user.loginstatus = true;

  $scope.user.role = "student";

  //sample data in eventDate
  //can change it to be something else
  $scope.event = {
    start:"2015-12-05T14:00:00Z",
    end:"2015-12-05T15:00:00Z",
    title: "Mom-to-Mom Group",
    description: "Need a moment to stop, connect, and breathe? Free and on-going for expecting, new, and experienced mothers. This group, put on by The Nursing Nook, offers gentle yoga and meditation, mother-to-mother support, local breastfeeding resources, playdate for breastfeeding babes, monthly guest speakers. Childcare for older siblings may be available. Please pre-register."
  };

  //need the click stuff

  //get the event stuff from the server


  // $http.get('/jade')
  //   .then(function (response) {
  //     console.log(response.data);
  //     $scope.y = response.data;
  //   });

}]);
