var express = require("express");
var router = express.Router();
var pg = require('pg');

//below line will tell a linter to ignore W043 warnging about using \
/*jshint multistr: true */

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/everyday_miracles';

// Select
router.get('/byEventId', function(req,res){
    var queryOptions = {
        event_id: req.query.eventId
    };

    var results = [];

    //below line will tell a linter to ignore W043 warnging about using \
    /*jshint multistr: true */
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
        //console.log(query);
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

// Insert
router.post('/', function(req,res){

    var queryOptions = {
        event_id: req.body.eventId,
        schedule_date: req.body.scheduleDate,
        start_datetime: req.body.startDateTime,
        end_datetime: req.body.endDateTime,
        teacher_user_id : req.body.teacherUserId
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO event_schedule (event_id, \
            schedule_date, \
            start_datetime, \
            end_datetime, \
            teacher_user_id) \
        VALUES \
        ($1, $2, $3, $4, $5);",
            [queryOptions.event_id,
                queryOptions.schedule_date,
                queryOptions.start_datetime,
                queryOptions.end_datetime,
                queryOptions.teacher_user_id],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });

});

// Update
router.put('/', function(req,res){

    var queryOptions = {
        event_schedule_id: req.body.eventScheduleId,
        event_id: req.body.eventId,
        schedule_date: req.body.scheduleDate,
        start_datetime: req.body.startDateTime,
        end_datetime: req.body.endDateTime,
        teacher_user_id : req.body.teacherUserId
    };

    pg.connect(connectionString, function (err, client) {

        client.query("UPDATE event_schedule \
                    SET event_id = $1, \
                        schedule_date = $2, \
                        start_datetime = $3, \
                        end_datetime = $4, \
                        teacher_user_id = $5 \
                    WHERE event_schedule_id = $6;",
            [queryOptions.event_id,
                queryOptions.schedule_date,
                queryOptions.start_datetime,
                queryOptions.end_datetime,
                queryOptions.teacher_user_id,
                queryOptions.event_schedule_id],
            function(err, result) {
                if(err) {
                    console.log("Error updating data: ", err);
                    res.send(false);
                }
                res.send(true);
            });
    });
});

// Delete
router.delete('/delete:id', function(req,res){
    pg.connect(connectionString, function (err, client) {
        client.query("DELETE FROM event_schedule WHERE event_schedule_id = $1", [req.params.id],
            function (err, result) {
                if (err) {
                    console.log("Error deleting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });
    });

});

module.exports = router;
