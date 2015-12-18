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
                        password, \
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
                        password, \
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
  console.log("on users/byNameOrPhone, req.query is ", req.query);
    var queryOptions = {
        first_name: req.query.firstName + '%',
        last_name: req.query.lastName + '%',
        phone_number: req.query.phoneNumber + '%'
    };
    console.log('query options, ', queryOptions);
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
                    WHERE first_name like $1 or last_name like $2 or phone_number like $3 \
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
        password: req.body.password,
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

        client.query("INSERT INTO users (user_name, \
            password, \
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
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) \
        RETURNING user_id;",
            [queryOptions.user_name,
            queryOptions.password,
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
        password: req.body.password,
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

        client.query("UPDATE users \
                    SET user_name = $1, \
                        password = $2, \
                        first_name = $3, \
                        last_name = $4, \
                        role_id = $5, \
                        date_of_birth = $6, \
                        phone_number = $7, \
                        email_address = $8, \
                        contact_type = $9, \
                        payment_type = $10, \
                        everyday_miracles_client_ind = $11, \
                        doula_name = $12, \
                        expected_birth_date = $13 \
                    WHERE user_id = $14;",
            [queryOptions.user_name,
            queryOptions.password,
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
