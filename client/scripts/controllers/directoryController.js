app.controller('DirectoryController',['$scope', '$http', 'ActiveProfileFactory',
'uiGridConstants', '$localstorage', "$location",
  function ($scope, $http, ActiveProfileFactory, uiGridConstants, $localstorage, $location) {

  var activeProfileFactory = ActiveProfileFactory;
  $scope.searchObject = new SearchObject();
  $scope.gridOptions = {};

//sets user on activeProfile Factory
  $scope.sendSelectedMemberInfo = function(id) {
    //activeProfileFactory.setActiveProfileData(id);
    $localstorage.set("searchUserId", id);
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

    $http.get('/users/byNameOrPhone',
        {params: $scope.searchObject}
      )
      .then(
        function (response) {
          $scope.gridOptions.data = response.data;
        }
      );
  };
  var getData = function (queryParams) {
    var promise = $http.get('/data',
      {params: queryParams}
    )
    .then(
      function (response) {
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
