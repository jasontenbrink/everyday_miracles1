app.controller('UserRegistrationController',['$scope', '$http', '$location', '$localstorage',
  function ($scope, $http, $location, $localstorage) {
  console.log('hi, from UserRegistrationController');
  $scope.user={};
  var userId = $localstorage.get('userId');

  $scope.submitRegistration = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/userregistration', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        if (response.status===200 && userId){
          $localstorage.set('searchUser', response.data.userId);
          $location.path('/profile');
        }
        else{
          $location.path('/login');
        }

      });
  };


}]);
