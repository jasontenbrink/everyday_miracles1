app.controller('StudentClassListController', ["$scope", "$http", function($scope,$http){
    console.log("student class controller says hi");
    $scope.user = {};

    $scope.gridOptions1 = {};
    $scope.gridOptions2 = {};

    $scope.gridOptions1 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "startDateTime", name: "Date"},
            {field: "status", name: "Status"},
            {name: "action", displayName: "Action", cellTemplate: '<md-button class = "md-raised md-warn" ng-model="" ' +
            'ng-click="grid.appScope.deleteClass(row.entity)">delete</md-button>'}
        ]
    };
    $scope.gridOptions2 = {
        columnDefs: [
            {field: "title", name: "Class"},
            {field: "startDateTime", name: "Date"},
            {field: "status", name: "Status"}
        ]
    };
    //test user info
    $scope.user.firstName = "Paul";
    $scope.user.lastName = "Zimmel";
    //test grid info
    $scope.gridOptions1.data = [
        {"title": "Mom to Mom", "startDateTime": "2015-12-29T10:00:00.000Z", status: "registered"},
        {"title": "Mom to Mom", "startDateTime": "2015-12-30T10:00:00.000Z", status: "registered"}
    ];

    $scope.gridOptions2.data = [
        {"title": "Mom to Mom", "startDateTime": "2015-12-01T19:00:00.000Z", status: "attended"},
        {"title": "Mom to Mom", "startDateTime": "2015-12-02T15:00:00.000Z", status: "attended"},
        {"title": "Mom to Mom", "startDateTime": "2015-12-03T12:00:00.000Z", status: "attended"}

    ];
}]);