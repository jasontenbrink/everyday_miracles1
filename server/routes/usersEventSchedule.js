var express = require("express");
var router = express.Router();
var pg = require('pg');

/*jshint multistr: true */
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/everyday_miracles';

// Select the event schedule by user id
router.get('/byUserId', function(req,res){
    var queryOptions = {
        user_id: req.query.userId
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
        event.event_id, \
            event.title, \
            event.event_category_id, \
            users_event_schedule.user_id, \
            users_event_schedule.event_schedule_id, \
            users_event_schedule.status, \
            users_event_schedule.comments, \
            event_schedule.schedule_date, \
            event_schedule.start_datetime, \
            event_schedule.end_datetime, \
            event_category.name \
        FROM \
        event \
        JOIN event_schedule on event.event_id = event_schedule.event_id \
        JOIN event_category on event.event_category_id = event_category.event_category_id \
        JOIN users_event_schedule on event_schedule.event_schedule_id = users_event_schedule.event_schedule_id \
        WHERE \
        users_event_schedule.user_id = $1;", [queryOptions.user_id]);
        //console.log(query);
        // Stream results back one row at a time, push into results array
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

// Select students for a class
router.get('/byEventScheduleId', function(req,res){
    var queryOptions = {
        event_schedule_id: req.query.eventScheduleId
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
        event.event_id, \
            event.title, \
            event.event_category_id, \
            users_event_schedule.user_id, \
            users_event_schedule.event_schedule_id, \
            users_event_schedule.status, \
            users_event_schedule.comments, \
            event_schedule.schedule_date, \
            event_schedule.start_datetime, \
            event_schedule.end_datetime, \
            event_category.name, \
            users.first_name, \
            users.last_name, \
            users.phone_number, \
            users.payment_type \
        FROM \
        event \
        JOIN event_schedule on event.event_id = event_schedule.event_id \
        JOIN event_category on event.event_category_id = event_category.event_category_id \
        JOIN users_event_schedule on event_schedule.event_schedule_id = users_event_schedule.event_schedule_id \
        JOIN users on users_event_schedule.user_id = users.user_id \
        WHERE \
        users_event_schedule.event_schedule_id = $1;", [queryOptions.event_schedule_id]);
        //console.log(query);
        // Stream results back one row at a time, push into results array
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
        user_id: req.body.userId,
        event_schedule_id: req.body.eventScheduleId,
        status: req.body.status,
        comments: req.body.comments
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO users_event_schedule (user_id, \
            event_schedule_id, \
            status, \
            comments) \
        VALUES \
        ($1, $2, $3, $4);",
            [queryOptions.user_id,
                queryOptions.event_schedule_id,
                queryOptions.status,
                queryOptions.comments],
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
        user_id: req.body.userId,
        event_schedule_id: req.body.eventScheduleId,
        status: req.body.status,
        comments: req.body.comments
    };

    pg.connect(connectionString, function (err, client) {

        client.query("UPDATE users_event_schedule \
                    SET status = $1, \
                        comments = $2 \
                    WHERE user_id = $3 and \
                        event_schedule_id = $4;",
            [queryOptions.status,
                queryOptions.comments,
                queryOptions.user_id,
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
router.get('/delete', function(req,res){
    var queryOptions = {
        user_id: req.query.userId,
        event_schedule_id: req.query.eventScheduleId
    };
    pg.connect(connectionString, function (err, client) {
        client.query("DELETE FROM users_event_schedule WHERE user_id = $1 and event_schedule_id = $2",
            [queryOptions.user_id, queryOptions.event_schedule_id],
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
