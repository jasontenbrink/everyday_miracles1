app.controller('LoginController',['$scope', '$http', '$location',
  function ($scope, $http, $location) {
  console.log('hi, from Login Controller');

  $scope.user = {};
  $scope.submitCredentials = function () {
    console.log('data sent to server', $scope.user);
    $http.post('/login', $scope.user)
      .then(function (response) {
        //console.log('is this html?', response.data);
        console.log('response is', response);
        if (response.status===200){
          $location.path('/uicalendar');
        }
        else{
          $location.path('/failure');
        }

      });
  };

}]);
