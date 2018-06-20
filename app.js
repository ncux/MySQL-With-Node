const express = require('express');
const mysql = require('mysql');

const port = process.env.PORT || 3000;

// database connection
const database = mysql.createConnection({host: 'db4free.net', user: '*********', password: '********', database: '********'});


try {
    database.connect(() => console.log('Connected to MySQL!'));
} catch (e) {
    console.log(e);
}


const app = express();


// create a Table
app.get('/create', (req, res) => {
    let sql = 'CREATE TABLE if_else(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';

    database.query(sql, (err, result) => {
        if (err) { console.log(err); }
        else {
            console.log(result);
            res.send("Successfully created table 'if_else'.");
        }
    })
});


// insert records into 'if_else' table
app.get('/save', (req, res) => {
    let record = {title: 'Hot AF!', body: 'Need some!'};
    let sql = 'INSERT INTO if_else SET ?';

    database.query(sql, record, err => {
        if (err) { console.log(err); }
        else { res.send('Record saved successfully!'); }
    })
});


// making multiple selections from the table
app.get('/records', (req, res) => {
    let sql = 'SELECT * FROM if_else';

    database.query(sql, (err, records) => {
        if (err) { console.log(err); }
        else { res.send(records); }
    })
});


// making a single selection from the table
app.get('/record/:id', (req, res) => {
    let sql = `SELECT * FROM if_else WHERE id = ${req.params.id}`;

    database.query(sql, (err, record) => {
        if (err) { console.log(err); }
        else { res.send(record); }
    })
});


// updating a record
app.get('/update/:id', (req, res) => {
    let update = 'Cam show';

    let sql = `UPDATE if_else SET title = '${update}' WHERE id = ${req.params.id}`;

    database.query(sql, err => {
        if (err) { console.log(err); }
        else { res.send('Record successfully updated!'); }
    })
});


// deleting a record
app.get('/delete/:id', (req, res) => {

    let sql = `DELETE FROM if_else WHERE id = ${req.params.id}`;

    database.query(sql, err => {
        if (err) { console.log(err); }
        else { res.send('Record successfully deleted!'); }
    })
});



app.listen(port, () => console.log(`Server running on port ${port}`));