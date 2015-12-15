var app = angular.module('app',['ngAnimate','ngRoute', 'ui.grid',
  'ui.grid.selection','ngMaterial', 'ui.grid.exporter', 'ui.calendar']);

app.config(['$routeProvider', function($routeProvider){

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
                    templateUrl: 'assets/views/routes/uicalendar.html',
                    controller: "UiCalendarController"
                })
                .when('/jade', {
                    templateUrl: '/templates/test.jade',
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
                     templateUrl: '/templates/addevent.jade',
                     controller: "AddEventController"
                 })
                 .when('/chooseclassdates', {
                     templateUrl: '/templates/chooseclassdates.jade',
                     controller: "ChooseClassDatesController"
                 })
                 .when('/confirmclasssignup', {
                     templateUrl: '/templates/confirmclasssignup.jade',
                     controller: "ConfirmClassSignupController"
                 })
                 .when('/editevent', {
                     templateUrl: '/templates/editevent.jade',
                     controller: "EditEventController"
                 })
                 .when('/login', {
                     templateUrl: '/templates/login.jade',
                     controller: "LoginController"
                 });


}]);
