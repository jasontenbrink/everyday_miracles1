app.controller('DirectoryController',['$scope', '$http', 'ActiveProfileFactory',
'uiGridConstants', '$localstorage', "$location",
  function ($scope, $http, ActiveProfileFactory, uiGridConstants, $localstorage, $location) {

  var activeProfileFactory = ActiveProfileFactory;
  console.log('hi, from Directory Controller');
  $scope.searchObject = new SearchObject();
  $scope.gridOptions = {};

//sets user on activeProfile Factory
  $scope.sendSelectedMemberInfo = function(id) {
    console.log('this is the searchUser id', id);
    //activeProfileFactory.setActiveProfileData(id);
    $localstorage.set("searchUserId", id);
      console.log("the searchUserId: ",$localstorage.get("searchUserId"));
    $location.path('/profile');
  };

  $scope.gridOptions = {
    columnDefs: [
           { field: 'first_name',
             cellTemplate: '<a ng-click="grid.appScope.sendSelectedMemberInfo(row.entity.user_id)" ' +
             'href="#/profile">{{COL_FIELD}}</a>',
             sort: {
               direction: uiGridConstants.ASC,
               priority: 1
             }
           },
           { field: 'last_name',
              sort: {direction: uiGridConstants.ASC, priority: 2}
           },
           { field: 'phone_number'},
           {field: 'user_id', visible: false}
         ],
    enableFullRowSelection: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  $scope.getResults = function () {

    console.log("search object, ", $scope.searchObject);
    $http.get('/users/byNameOrPhone',
        {params: $scope.searchObject}
      )
      .then(
        function (response) {
          console.log('response from server', response.data);
          $scope.gridOptions.data = response.data;
        }
      );
  };
  var getData = function (queryParams) {
    console.log('heading out from factory', queryParams);
    var promise = $http.get('/data',
      {params: queryParams}
    )
    .then(
      function (response) {
        console.log('response from server', response.data);
        data = response.data;
      }
    );
    return promise;
  };
  $scope.addNewStudent = function(){
      //talk with Jason about this
      //var path = "directory";
      //$location.path('/profile');
  };
}]);

function SearchObject() {
          this.firstName='';
          this.lastName='';
          this.phoneNumber='';
        }
