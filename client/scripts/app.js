var app = angular.module('app',['ngAnimate','ngRoute', 'ui.grid',
  'ui.grid.selection','ngMaterial', 'ui.grid.exporter', 'ui.calendar']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

  $httpProvider.interceptors.push('AuthenticationRedirectInjector');

  $routeProvider
                .when('/calendar', {
                  templateUrl: 'assets/views/routes/calendar.html',
                  controller: "CalendarController"
                })
                .when('/testsql', {
                    templateUrl: "assets/views/routes/testsql.html",
                    controller: "TestSqlController"
                })
                .when('/uicalendar', {
                    templateUrl: '/templates/uicalendar.jade',
                    controller: "UiCalendarController"
                })
                .when('/jade', {
                    templateUrl: '/secure/templates/test.jade',
                    controller: "JadeController"
                 })
                .when('/anotherroute', {
                    templateUrl: '/templates/routeTest.jade',
                    controller: "JadeController"
                })
                .when('/eventdetails', {
                    templateUrl: '/templates/eventdetails.jade',
                    controller: "EventDetailsController"
                 })
                 .when('/addevent', {
                     templateUrl: '/secure/templates/addevent.jade',
                     controller: "AddEventController"
                 })
                 .when('/chooseclassdates', {
                     templateUrl: '/secure/templates/chooseclassdates.jade',
                     controller: "ChooseClassDatesController"
                 })
                 .when('/confirmclasssignup', {
                     templateUrl: '/templates/confirmclasssignup.jade',
                     controller: "ConfirmClassSignupController"
                 })
                 .when('/profile', {
                     templateUrl:'/templates/profile.jade',
                     controller: "ProfileController"
                  })
                 .when('/changepassword', {
                     templateUrl:'secure/templates/changepassword.jade',
                     controller:'ChangePasswordController'
                  })
                 .when('/editevent', {
                     templateUrl: '/secure/templates/editevent.jade',
                     controller: "EditEventController"
                 })
                 .when('/login', {
                     templateUrl: '/templates/login.jade',
                     controller: "LoginController"
                 })
                 .when('/userregistration', {
                     templateUrl: '/templates/userregistration.jade',
                     controller: "UserRegistrationController"
                 })
                  .when('/attendance', {
                      templateUrl: '/templates/attendance.jade',
                      controller: "AttendanceController"
                  })
                  .when('/findwalkin', {
                      templateUrl: '/templates/findwalkin.jade',
                      controller: "FindWalkinController"
                  })
                  .when('/addwalkin', {
                      templateUrl: '/templates/addwalkin.jade',
                      controller: "AddWalkinController"
                  })
                  .when('/studentclasslist', {
                      templateUrl: '/templates/studentclasslist.jade',
                      controller: 'StudentClassListController'
                  })
                  .when('/directory', {
                      templateUrl: '/templates/directory.jade',
                      controller: "DirectoryController"
                  });


}]);
