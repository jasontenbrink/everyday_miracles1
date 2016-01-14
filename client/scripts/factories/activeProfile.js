app.factory("ActiveProfileFactory", ["$http", function($http){
  var profile = new User();
  var loggedInUser = new User();

  var publicApi = {
      setActiveProfileData: function(id) {
        profile.userId = id;
          return profile.user_id;
      },
      getActiveProfileData: function(){

          return profile;
      },
      setLoggedInUserToActiveProfile: function () {
        profile = loggedInUser;
      },
      setLoggedInUser: function (id) {
        loggedInUser.userId = id;
      },
      getLoggedInUser: function () {
        return loggedInUser;
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
