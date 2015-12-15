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
                });


}]);
