app.controller("ProfileController", ["$scope", "$http", "ActiveProfileFactory",
  function($scope, $http, ActiveProfileFactory){
    var activeProfileFactory = ActiveProfileFactory;
    $scope.user = {};
    $scope.tempUser = {};

    var testUser = activeProfileFactory.getActiveProfileData();

    //test user data to populate form
    // var testUser = {
    //     userId: 1
    // };

    //get profile info for profile page
    $scope.getUser = function(someuser){
        console.log("the input of getUser: ",someuser);
        $http.get('/users/byUserId', {params: someuser}).then(function (response) {
            console.log("Output from get /users/byUserId ", response.data);
            $scope.tempUser = response.data[0];

            //define $scope.user
            $scope.user.firstName = $scope.tempUser.first_name;
            $scope.user.lastName = $scope.tempUser.last_name;
            $scope.user.userId = $scope.tempUser.user_id;
            $scope.user.userName = $scope.tempUser.user_name;
            $scope.user.password = $scope.tempUser.password;
            $scope.user.roleName = $scope.tempUser.role_name;
            $scope.user.roleId = $scope.tempUser.role_id;
            $scope.user.dateOfBirth = $scope.tempUser.date_of_birth;
            $scope.user.phoneNumber = $scope.tempUser.phone_number;
            $scope.user.emailAdress = $scope.tempUser.email_address;
            $scope.user.contactType = $scope.tempUser.contact_type;
            $scope.user.paymentType = $scope.tempUser.payment_type;
            $scope.user.everydayMiraclesClientInd = $scope.tempUser.everyday_miracles_client_ind;
            $scope.user.doulaName = $scope.tempUser.doula_name;
            $scope.user.expectedBirthDate = $scope.tempUser.expected_birth_date;

            console.log("the #scope.user: ", $scope.user);
        });
    };

    $scope.saveProfile = function(someuser) {

        console.log("Input to put /users ", someuser);
        $http.put('/users', someuser).then(function (response) {
            console.log("Output from put /users ", response.data);
        });
    };
    $scope.getUser(testUser);

}]);
