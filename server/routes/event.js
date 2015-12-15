var express = require("express");
var router = express.Router();
var pg = require('pg');
/*jshint multistr: true */
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/everyday_miracles';

// Select
router.get('/byDateRange', function(req,res){
    var queryOptions = {
        start_date: req.query.startDate,
        end_date: req.query.endDate
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
            event.event_id, \
            event.title, \
            event.description, \
            event.event_category_id, \
            event.repeat_type, \
            event.repeat_from_date, \
            event.repeat_to_date, \
            event.repeat_sunday_ind, \
            event.repeat_monday_ind, \
            event.repeat_tuesday_ind, \
            event.repeat_wednesday_ind, \
            event.repeat_thursday_ind, \
            event.repeat_friday_ind, \
            event.repeat_saturday_ind, \
            event_category.name as event_category_name, \
            event_schedule.event_schedule_id, \
            event_schedule.schedule_date, \
            event_schedule.start_datetime, \
            event_schedule.end_datetime, \
            event_schedule.teacher_user_id, \
            users.first_name as teacher_first_name, \
            users.last_name as teacher_last_name \
        FROM \
            event \
            JOIN event_category ON event.event_category_id = event_category.event_category_id \
            JOIN event_schedule ON event.event_id = event_schedule.event_id \
            LEFT JOIN users ON event_schedule.teacher_user_id = users.user_id \
        WHERE event_schedule.schedule_date between $1 and $2;",
            [queryOptions.start_date, queryOptions.end_date]);
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

// Select
router.get('/byEventIdEventScheduleId', function(req,res){
    var queryOptions = {
        event_id: req.query.eventId,
        event_schedule_id: req.query.eventScheduleId
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
        event.event_id, \
            event.title, \
            event.description, \
            event.event_category_id, \
            event.repeat_type, \
            event.repeat_from_date, \
            event.repeat_to_date, \
            event.repeat_sunday_ind, \
            event.repeat_monday_ind, \
            event.repeat_tuesday_ind, \
            event.repeat_wednesday_ind, \
            event.repeat_thursday_ind, \
            event.repeat_friday_ind, \
            event.repeat_saturday_ind, \
            event_category.name as event_category_name, \
            event_schedule.event_schedule_id, \
            event_schedule.schedule_date, \
            event_schedule.start_time, \
            event_schedule.end_time, \
            event_schedule.teacher_user_id, \
            users.first_name as teacher_first_name, \
            users.last_name as teacher_last_name \
        FROM \
            event \
            JOIN event_category ON event.event_category_id = event_category.event_category_id \
            JOIN event_schedule ON event.event_id = event_schedule.event_id \
            LEFT JOIN users ON event_schedule.teacher_user_id = users.user_id \
        WHERE event.event_id = $1 and event_schedule_id = $2;",
            [queryOptions.event_id, queryOptions.event_schedule_id]);
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

// Select
router.get('/byEventId', function(req,res){
    var queryOptions = {
        event_id: req.query.eventId
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
            event.event_id, \
            event.title, \
            event.description, \
            event.event_category_id, \
            event.repeat_type, \
            event.repeat_from_date, \
            event.repeat_to_date, \
            event.repeat_sunday_ind, \
            event.repeat_monday_ind, \
            event.repeat_tuesday_ind, \
            event.repeat_wednesday_ind, \
            event.repeat_thursday_ind, \
            event.repeat_friday_ind, \
            event.repeat_saturday_ind \
        FROM event \
        WHERE event_id = $1;", [queryOptions.event_id]);
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
        title: req.body.title,
        description: req.body.description,
        event_category_id: req.body.eventCategoryId,
        repeat_type: req.body.repeatType,
        repeat_from_date : req.body.repeatFromDate,
        repeat_to_date: req.body.repeatToDate,
        repeat_sunday_ind: req.body.repeatSundayInd,
        repeat_monday_ind: req.body.repeatMondayInd,
        repeat_tuesday_ind: req.body.repeatTuesdayInd,
        repeat_wednesday_ind: req.body.repeatWednesdayInd,
        repeat_thursday_ind: req.body.repeatThursdayInd,
        repeat_friday_ind: req.body.repeatFridayInd,
        repeat_saturday_ind: req.body.repeatSaturdayInd
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO event (title, \
            description, \
            event_category_id, \
            repeat_type, \
            repeat_from_date, \
            repeat_to_date, \
            repeat_sunday_ind, \
            repeat_monday_ind, \
            repeat_tuesday_ind, \
            repeat_wednesday_ind, \
            repeat_thursday_ind, \
            repeat_friday_ind, \
            repeat_saturday_ind) \
        VALUES \
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);",
            [queryOptions.title,
                queryOptions.description,
                queryOptions.event_category_id,
                queryOptions.repeat_type,
                queryOptions.repeat_from_date,
                queryOptions.repeat_to_date,
                queryOptions.repeat_sunday_ind,
                queryOptions.repeat_monday_ind,
                queryOptions.repeat_tuesday_ind,
                queryOptions.repeat_wednesday_ind,
                queryOptions.repeat_thursday_ind,
                queryOptions.repeat_friday_ind,
                queryOptions.repeat_saturday_ind],
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
        event_id: req.body.eventId,
        title: req.body.title,
        description: req.body.description,
        event_category_id: req.body.eventCategoryId,
        repeat_type: req.body.repeatType,
        repeat_from_date : req.body.repeatFromDate,
        repeat_to_date: req.body.repeatToDate,
        repeat_sunday_ind: req.body.repeatSundayInd,
        repeat_monday_ind: req.body.repeatMondayInd,
        repeat_tuesday_ind: req.body.repeatTuesdayInd,
        repeat_wednesday_ind: req.body.repeatWednesdayInd,
        repeat_thursday_ind: req.body.repeatThursdayInd,
        repeat_friday_ind: req.body.repeatFridayInd,
        repeat_saturday_ind: req.body.repeatSaturdayInd
    };

    pg.connect(connectionString, function (err, client) {

        client.query("UPDATE event \
                    SET title = $1, \
                        description = $2, \
                        event_category_id = $3, \
                        repeat_type = $4, \
                        repeat_from_date = $5, \
                        repeat_to_date = $6, \
                        repeat_sunday_ind = $7, \
                        repeat_monday_ind = $8, \
                        repeat_tuesday_ind = $9, \
                        repeat_wednesday_ind = $10, \
                        repeat_thursday_ind = $11, \
                        repeat_friday_ind = $12, \
                        repeat_saturday_ind = $13 \
                    WHERE event_id = $14;",
            [queryOptions.title,
                queryOptions.description,
                queryOptions.event_category_id,
                queryOptions.repeat_type,
                queryOptions.repeat_from_date,
                queryOptions.repeat_to_date,
                queryOptions.repeat_sunday_ind,
                queryOptions.repeat_monday_ind,
                queryOptions.repeat_tuesday_ind,
                queryOptions.repeat_wednesday_ind,
                queryOptions.repeat_thursday_ind,
                queryOptions.repeat_friday_ind,
                queryOptions.repeat_saturday_ind,
                queryOptions.event_id],
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
        client.query("DELETE FROM event WHERE event_id = $1", [req.params.id],
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
