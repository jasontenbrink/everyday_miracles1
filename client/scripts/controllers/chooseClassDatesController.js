app.controller('ChooseClassDatesController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from choose class dates Controller');

  var classdates = [
    "Friday, January 15, 2016",
    "Friday, January 22, 2016",
    "Friday, January 29, 2016",
    "Friday, February 5, 2016",
    "Friday, February 12, 2016"
  ];

  for (i=0; i<classdates.length; i++) {
    return classdates;
    console.log(classdates);
  }

}]);
