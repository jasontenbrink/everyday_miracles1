app.controller("ProfileController", ["$scope", "$http", function($scope, $http){
    $scope.user = {};
    $scope.tempUser = {};

    //test user data to populate form
    var user = {
        userId: 1
    };

    //get profile info for profile page
    $scope.getUser = function(user){
        $http.get('/users/byUserId', {params: user}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
            $scope.tempUser = response.data[0];

            //define $scope.user
            $scope.user.firstName = $scope.tempUser.first_name;
            $scope.user.lastName = $scope.tempUser.last_name;
            $scope.user.userId = $scope.tempUser.user_id;
            $scope.user.userName = $scope.tempUser.user_name;
            $scope.user.password = $scope.tempUser.password;
            $scope.user.role = $scope.tempUser.role_name;
            $scope.user.dateOfBirth = $scope.tempUser.date_of_birth;
            $scope.user.phoneNumber = $scope.tempUser.phone_number;
            $scope.user.emailAdress = $scope.tempUser.email_address;
            $scope.user.contactType = $scope.tempUser.contact_type;
            $scope.user.paymentType = $scope.tempUser.payment_type;
            $scope.user.everydayMiraclesClientInd = $scope.everyday_miracles_client_ind;
            $scope.user.doulaName = $scope.tempUser.doula_name;
            $scope.user.expectedBirthDate = $scope.tempUser.expected_birth_date;

            console.log("the #scope.user: ", user);
        });
    };

    $scope.getUser(user);

}]);