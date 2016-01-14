var express = require("express");
var router = express.Router();
var pg = require('pg');

//below line will tell a linter to ignore W043 warnging about using \
/*jshint multistr: true */

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/everyday_miracles';
// Select
router.get('/byUserId', function(req,res){
    var queryOptions = {
        user_id: req.query.userId
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        user_id, \
                        user_name, \
                        first_name, \
                        last_name, \
                        users.role_id, \
                        date_of_birth, \
                        phone_number, \
                        email_address, \
                        contact_type, \
                        payment_type, \
                        everyday_miracles_client_ind, \
                        doula_name, \
                        expected_birth_date,\
                        role.name as role_name \
                    FROM \
                        users\
                        JOIN role on users.role_id = role.role_id \
                    WHERE user_id = $1 \
                    ORDER BY user_name;", [queryOptions.user_id]);
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
router.get('/roles', function(req,res){

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        role_id, \
                        name \
                    FROM \
                        role \
                    ORDER BY role_id;");
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
router.get('/teachers', function(req,res){

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        user_id, \
                        first_name, \
                        last_name \
                    FROM \
                        users \
                    WHERE role_id = 3 \
                    ORDER BY first_name, last_name;");
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
router.get('/byUserName', function(req,res){
    var queryOptions = {
        user_name: req.query.userName
    };

    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        user_id, \
                        user_name, \
                        first_name, \
                        last_name, \
                        users.role_id, \
                        date_of_birth, \
                        phone_number, \
                        email_address, \
                        contact_type, \
                        payment_type, \
                        everyday_miracles_client_ind, \
                        doula_name, \
                        expected_birth_date,\
                        role.name as role_name \
                    FROM \
                        users\
                        JOIN role on users.role_id = role.role_id \
                    WHERE user_name like $1 \
                    ORDER BY user_name;", [queryOptions.user_name]);
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
router.get('/byNameOrPhone', function(req,res){
    var queryOptions = {
        first_name: req.query.firstName + '%',
        last_name: req.query.lastName + '%',
        phone_number: req.query.phoneNumber + '%'
    };
    var results = [];

    /*jshint multistr: true */
    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT \
                        user_id, \
                        user_name, \
                        first_name, \
                        last_name, \
                        users.role_id, \
                        date_of_birth, \
                        phone_number, \
                        email_address, \
                        contact_type, \
                        payment_type, \
                        everyday_miracles_client_ind, \
                        doula_name, \
                        expected_birth_date,\
                        role.name as role_name \
                    FROM \
                        users JOIN role on users.role_id = role.role_id \
                    WHERE first_name like $1 and last_name like $2 and phone_number like $3 \
                    ORDER BY user_name;", [queryOptions.first_name, queryOptions.last_name, queryOptions.phone_number]);
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
        user_name: req.body.userName,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        role_id : req.body.roleId,
        date_of_birth: req.body.dateOfBirth,
        phone_number: req.body.phoneNumber,
        email_address: req.body.emailAddress,
        contact_type: req.body.contactType,
        payment_type: req.body.paymentType,
        everyday_miracles_client_ind: req.body.everydayMiraclesClientInd,
        doula_name: req.body.doulaName,
        expected_birth_date: req.body.expectedBirthDate
    };

    pg.connect(connectionString, function (err, client) {
        client.on('drain', client.end.bind(client));
        client.query("INSERT INTO users (user_name, \
            first_name, \
            last_name, \
            role_id, \
            date_of_birth, \
            phone_number, \
            email_address, \
            contact_type, \
            payment_type, \
            everyday_miracles_client_ind, \
            doula_name, \
            expected_birth_date) \
        VALUES \
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) \
        RETURNING user_id;",
            [queryOptions.user_name,
            queryOptions.first_name,
            queryOptions.last_name,
            queryOptions.role_id,
            queryOptions.date_of_birth,
            queryOptions.phone_number,
            queryOptions.email_address,
            queryOptions.contact_type,
            queryOptions.payment_type,
            queryOptions.everyday_miracles_client_ind,
            queryOptions.doula_name,
            queryOptions.expected_birth_date],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(result);
                }
                res.send(result);
            });
    });

});

// Update
router.put('/', function(req,res){

    var queryOptions = {
        user_id: req.body.userId,
        user_name: req.body.userName,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        role_id : req.body.roleId,
        date_of_birth: req.body.dateOfBirth,
        phone_number: req.body.phoneNumber,
        email_address: req.body.emailAddress,
        contact_type: req.body.contactType,
        payment_type: req.body.paymentType,
        everyday_miracles_client_ind: req.body.everydayMiraclesClientInd,
        doula_name: req.body.doulaName,
        expected_birth_date: req.body.expectedBirthDate
    };

    pg.connect(connectionString, function (err, client) {
        client.on('drain', client.end.bind(client));
        client.query("UPDATE users \
                    SET user_name = $1, \
                        first_name = $2, \
                        last_name = $3, \
                        role_id = $4, \
                        date_of_birth = $5, \
                        phone_number = $6, \
                        email_address = $7, \
                        contact_type = $8, \
                        payment_type = $9, \
                        everyday_miracles_client_ind = $10, \
                        doula_name = $11, \
                        expected_birth_date = $12 \
                    WHERE user_id = $13;",
            [queryOptions.user_name,
            queryOptions.first_name,
            queryOptions.last_name,
            queryOptions.role_id,
            queryOptions.date_of_birth,
            queryOptions.phone_number,
            queryOptions.email_address,
            queryOptions.contact_type,
            queryOptions.payment_type,
            queryOptions.everyday_miracles_client_ind,
            queryOptions.doula_name,
            queryOptions.expected_birth_date,
            queryOptions.user_id],
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
        client.on('drain', client.end.bind(client));
        client.query("DELETE FROM users WHERE user_id = $1", [req.params.id],
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
