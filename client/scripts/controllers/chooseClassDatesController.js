app.controller('ChooseClassDatesController',['$scope', '$http', function ($scope, $http) {
  console.log('hi, from choose class dates Controller');

// Select
//  $scope.chooseEventDates = function() {
    $http.get('/byEventId', function(req,res){
      var queryOptions = {
        event_id: req.query.eventId
      };

      $scope.classdates = [];

      //SQL Query > SELECT data from table
      pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
              event_schedule_id, \
              event_id, \
              schedule_date, \
              start_datetime, \
              end_datetime, \
              teacher_user_id \
          FROM event_schedule \
          WHERE event_id = $1;", [queryOptions.event_id]);
        console.log(query);

        // Stream results back one row at a time, push into results arrayd
        query.on('row', function (row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
          client.end();
          return res.json(results);
        });

        // Handle Errors
        if (err) {
          console.log(err);
        }
      });
    });
}]);
