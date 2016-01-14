app.controller("ChangePasswordController", ["$scope", "$http", "$location", "ActiveProfileFactory",
    function($scope, $http, $location, ActiveProfileFactory){
        //console.log("hi from changepasswordcontroller");
        //$scope.hi = "hi from controller"
        $scope.user = {};
        var activeProfileFactory = ActiveProfileFactory;

        $scope.user = activeProfileFactory.getActiveProfileData();
        $scope.confirmPassword = function(someuser){
            $http.put('/changePassword', {params: $scope.user}).then(function(response){
            });
        };
    }]);
