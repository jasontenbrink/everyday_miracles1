app.controller('StudentClassListController', ["$scope", "$http", function($scope,$http){
    console.log("student class controller says hi");
    $scope.user = {};

    $scope.allClasses = [];

    $scope.gridOptions1 = {};
    $scope.gridOptions1.data = [];
    $scope.gridOptions2 = {};
    $scope.gridOptions2.data = [];

    $scope.gridOptions1 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "start_datetime", name: "Date"},
            {field: "status", name: "Status"},
            {name: "action", displayName: "Action", cellTemplate: '<md-button class = "md-raised md-warn"' +
            'ng-click="grid.appScope.deleteClass(row.entity)">delete</md-button>'}
        ]
    };
    $scope.gridOptions2 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "start_datetime", name: "Date"},
            {field: "status", name: "Status"}
        ]
    };

    //test user info
    $scope.user.userId = 1;

    //get user info
    $scope.getUserInfo = function(someuser) {
        $http.get('/users/byUserId', {params: someuser}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
            $scope.user.firstName = response.data[0].first_name;
            $scope.user.lastName = response.data[0].last_name;
        });
    };

    $scope.getClasses = function(someuser) {
        $http.get('/usersEventSchedule/byUserId', {params: someuser}).then(function(response){
            console.log("Output from get /usersEventSchedule/byUserId ", response.data);
            $scope.allClasses = response.data;
            for (var i = 0; i < $scope.allClasses.length; i++) {
                if ($scope.allClasses[i].status == "Registered") {
                    $scope.gridOptions1.data.push($scope.allClasses[i]);
                } else if ($scope.allClasses[i].status == "Attended") {
                    $scope.gridOptions2.data.push($scope.allClasses[i]);
                }
            }
        });
    };

    $scope.getUserInfo($scope.user);
    $scope.getClasses($scope.user);

}]);