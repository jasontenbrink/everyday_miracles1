app.controller("ProfileController", ["$scope", "$http", "ActiveProfileFactory", "$location", "$localstorage","$window",
  function($scope, $http, ActiveProfileFactory, $location, $localstorage, $window){
    var activeProfileFactory = ActiveProfileFactory;
    $scope.user = {};
    $scope.tempUser = {};

    //var testUser = activeProfileFactory.getActiveProfileData();

    var userId = $localstorage.get("userId");

    var searchUserId = $localstorage.get("searchUserId");

    //get profile info for profile page
    $scope.getUser = function(){
        var user = {
            userId: searchUserId
        };
        $http.get('/users/byUserId', {params: user}).then(function (response) {
            $scope.tempUser = response.data[0];

            //define $scope.user
            $scope.user.firstName = $scope.tempUser.first_name;
            $scope.user.lastName = $scope.tempUser.last_name;
            $scope.user.userId = $scope.tempUser.user_id;
            $scope.user.userName = $scope.tempUser.user_name;
            $scope.user.roleName = $scope.tempUser.role_name;
            $scope.user.roleId = $scope.tempUser.role_id;
            $scope.user.dateOfBirth = $scope.tempUser.date_of_birth;
            if ($scope.user.dateOfBirth !== null) {
                $scope.user.dateOfBirth = new Date($scope.user.dateOfBirth);
            }
            $scope.user.phoneNumber = $scope.tempUser.phone_number;
            $scope.user.emailAdress = $scope.tempUser.email_address;
            $scope.user.contactType = $scope.tempUser.contact_type;
            $scope.user.paymentType = $scope.tempUser.payment_type;
            $scope.user.everydayMiraclesClientInd = $scope.tempUser.everyday_miracles_client_ind;
            $scope.user.doulaName = $scope.tempUser.doula_name;
            $scope.user.expectedBirthDate = $scope.tempUser.expected_birth_date;
            if ($scope.user.expectedBirthDate !==null){
                $scope.user.expectedBirthDate = new Date($scope.user.expectedBirthDate);
            }

        });
    };

    $http.get('/users/roles').then(function (response) {
        $scope.roles = response.data;
    });
    $scope.goToStudentClassList = function(){
        $location.path('/studentclasslist');
    };
    //save profile
    $scope.saveProfile = function() {

        $http.put('/users', $scope.user).then(function (response) {
            if (response.data) $window.alert('Profile Saved');
        });
    };

    //change password
    $scope.changePassword = function() {
        $location.path('/changepassword');
    };
    $scope.getUser();

}]);
