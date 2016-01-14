app.controller('StudentClassListController', ["$scope", "$http", "$localstorage",
    function($scope, $http, $localstorage){
    $scope.x = 'hi';
    $scope.user1Id = $localstorage.get("searchUserId");

    $scope.user1 = {};
    $scope.allClasses = [];
    $scope.gridOptions1 = {};
    $scope.gridOptions1.data = [];
    $scope.gridOptions2 = {};
    $scope.gridOptions2.data = [];

    $scope.clearVariables = function() {
        $scope.allClasses = [];
        $scope.gridOptions1 = {};
        $scope.gridOptions1.data = [];
        $scope.gridOptions2 = {};
        $scope.gridOptions2.data = [];
    };

    $scope.gridOptions1 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "start_datetime", cellFilter: "date: 'M/d h:mm'", name: "Date"},
            {field: "status", name: "Status", visible:false},
            {name: "action", displayName: "Action", cellTemplate: '<button class = "ui-grid-button"' +
            'ng-click="grid.appScope.deleteClass(row.entity)">Delete</md-button>'}
        ]
    };
    $scope.gridOptions2 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "start_datetime", cellFilter: "date: 'M/d h:mm'", name: "Date"},
            {field: "status", name: "Status"}
        ]
    };

    //test user info
    //$scope.user1.userId = 1;

    //get user info
    $scope.getUserInfo = function() {
        var user = {
            userId: $scope.user1Id
        };
        $http.get('/users/byUserId', {params: user}).then(function (response) {
            $scope.user1 = response.data[0];
        });
    };

    $scope.getClasses = function() {
        var userObject = {
            userId: $scope.user1Id
        };
        $http.get('/usersEventSchedule/byUserId', {params: userObject}).then(function(response){
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

    $scope.deleteClass = function(someclass) {
        //$scope.deleteUsersEventSchedule = function() {
        //
            var event = {userId: someclass.user_id,
                eventScheduleId: someclass.event_schedule_id};
        //
            $http.get('/usersEventSchedule/delete', {params: event}).then(function(response){
                $scope.clearVariables();
                $scope.getClasses();
            });
        //};
    };

    $scope.getUserInfo();
    $scope.getClasses();

}]);
