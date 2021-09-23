const express = require('express');
const app = express();
const {Pool} = require('pg');
const port = process.env.PORT || 5000;
let env = require("dotenv").config();

// credentials for the database connection. values stored in an env file
const credentials = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE
};

// connection is created here
const pool = new Pool(credentials);

const getAll = (req, res) => {
    pool.query('select * from test_table', (err, rows) => {
        if (err) {
            return res.json({
                'error': true,
                'message': 'an unknown error occured - ' + err
            })
        } else res.json(rows);
    })
};

const getNames = (req, res) => {
    let sql = 'select $1, $2 from test_table';
    let values = ['empno', 'name'];
    pool.query(sql, values, (err, rows) => {
        if(err) {
            return res.json({
                'error': true,
                'message': 'an unknown error ocurred - ' + err
            })
        } else res.json(rows);
    })
}

// names route
app.get('/names', (req, res) => {
    getNames(req, res);
})

// root route
app.get('/', (req, res) => {
    // passing in req and res to function
    getAll(req, res);
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})