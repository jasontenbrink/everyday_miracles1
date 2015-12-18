app.factory("ActiveProfileFactory", ["$http", function($http){
  var user = new User();

  var publicApi = {
      setActiveProfileData: function(id) {
        user.userId = id;
        console.log('user: ', user);
          return user.user_id;
      },
      getActiveProfileData: function(){
        console.log("active user from factory, ", user);
          return user;
      }
  };

  return publicApi;
}]);

function User() {
  this.firstName = '';
  this.lastName = '';
  this.userId = '';
  this.userName = '';
  this.password = '';
  this.roleName = '';
  this.roleId = '';
  this.dateOfBirth = '';
  this.phoneNumber = '';
  this.emailAdress = '';
  this.contactType = '';
  this.paymentType = '';
  this.everydayMiraclesClientInd = '';
  this.doulaName = '';
  this.expectedBirthDate = '';
}
