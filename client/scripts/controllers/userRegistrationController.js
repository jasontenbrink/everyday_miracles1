app.controller('UserRegistrationController',['$scope', '$http', '$location', '$localstorage',
  function ($scope, $http, $location, $localstorage) {

  $scope.user={};
  $scope.roles = [];
  var userId = $localstorage.get('userId');

  $http.get('/users/roles').then(function (response) {
    $scope.roles = response.data;
  });

  $scope.submitRegistration = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/userregistration', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response userIdis', response);
        if (response.status===200 && userId){
          $localstorage.set('searchUserId', response.data.userId);
          $location.path('/profile');
        }
        else{
          $location.path('/login');
        }

      });
  };


}]);
